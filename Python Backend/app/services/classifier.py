from typing import List
import torch
from app.schemas.transaction import TransactionItem, PredictionResult
from app.services.preprocess import normalize_text, extract_merchant
from app.services.model_loader import load_text_model, get_device
from app.core.config import settings


@torch.inference_mode()
def classify_transactions(transactions: List[TransactionItem]) -> List[PredictionResult]:
    tokenizer, model = load_text_model()
    device = get_device()

    texts = [normalize_text(t.text) for t in transactions]
    merchants = [extract_merchant(x) for x in texts]

    encoded = tokenizer(
        texts,
        padding=True,
        truncation=True,
        max_length=64,
        return_tensors="pt",
    ).to(device)

    logits = model(**encoded).logits
    probs = torch.softmax(logits, dim=-1)

    pred_ids = torch.argmax(probs, dim=-1).tolist()
    confs = torch.max(probs, dim=-1).values.tolist()

    results: List[PredictionResult] = []
    for t, merchant, pid, conf in zip(transactions, merchants, pred_ids, confs):
        category = settings.LABELS[pid] if pid < len(settings.LABELS) else "OTHER"
        results.append(
            PredictionResult(
                txnId=t.txnId,
                category=category,
                confidence=round(float(conf), 2),
                merchant=merchant,
                reason="Deep learning model prediction",
            )
        )
    return results