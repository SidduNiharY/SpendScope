from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class TransactionItem(BaseModel):
    txnId: str = Field(..., description="Unique transaction ID")
    text: str = Field(..., description="Raw description e.g. '200 -> Maruti petrol bunk'")
    amount: float = Field(..., ge=0, description="Transaction amount")
    txnTime: Optional[datetime] = Field(None, description="Transaction time (ISO 8601)")


class ClassifyRequest(BaseModel):
    userId: str
    source: Optional[str] = Field(default=None, description="gpay/phonepe/bank/etc")
    currency: str = Field(default="INR")
    transactions: List[TransactionItem]


class PredictionResult(BaseModel):
    txnId: str
    category: str
    confidence: float = Field(..., ge=0, le=1)
    merchant: str
    reason: str


class ClassifyResponse(BaseModel):
    userId: str
    results: List[PredictionResult]
