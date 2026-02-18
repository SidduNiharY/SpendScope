import re


def normalize_text(text: str) -> str:
    """
    Normalize free-form transaction text into a consistent uppercase token string.
    """
    t = text.strip().upper()
    t = t.replace("->", " ")
    t = re.sub(r"[^A-Z0-9\s]", " ", t)   # remove punctuation
    t = re.sub(r"\s+", " ", t).strip()
    return t


def extract_merchant(normalized_text: str) -> str:
    """
    A simple merchant extraction:
    - remove leading amounts
    - remove common noise words
    """
    t = re.sub(r"^\d+(\.\d+)?\s+", "", normalized_text)  # remove leading amount if present
    noise = {"UPI", "PAYMENT", "TO", "AT", "FROM", "REF", "TXN", "TRANSFER"}
    tokens = [x for x in t.split() if x not in noise]
    merchant = " ".join(tokens[:6]).strip()  # keep first few tokens
    return merchant or normalized_text
