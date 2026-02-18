from functools import lru_cache
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from app.core.config import settings


@lru_cache(maxsize=1)
def get_device() -> torch.device:
    # Use MPS on Apple Silicon if available, else CPU
    if torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")


@lru_cache(maxsize=1)
def load_text_model():
    """
    Loads a fine-tuned transformer model from local folder (recommended),
    or from HuggingFace model id.
    """
    model_path = settings.MODEL_PATH  # e.g. "./models/tx_classifier"
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    model.eval()
    model.to(get_device())
    return tokenizer, model