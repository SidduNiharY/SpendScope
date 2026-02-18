from fastapi import APIRouter
from app.schemas.transaction import ClassifyRequest, ClassifyResponse
from app.services.classifier import classify_transactions

router = APIRouter()


@router.post("/classify", response_model=ClassifyResponse)
def classify(req: ClassifyRequest):
    results = classify_transactions(req.transactions)
    return ClassifyResponse(userId=req.userId, results=results)
