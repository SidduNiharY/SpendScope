from typing import Optional, Tuple


# Simple keyword-based rules. You can expand anytime.
RULES = [
    ("FUEL", ["PETROL", "BUNK", "FUEL", "DIESEL", "HPCL", "BPCL", "IOCL"]),
    ("GROCERIES", ["GROCERY", "SUPERMARKET", "MART", "STORE", "RETAIL", "PROVISION"]),
    ("FOOD", ["RESTAURANT", "CAFE", "BIRYANI", "HOTEL", "SWIGGY", "ZOMATO", "FOOD"]),
    ("ENTERTAINMENT", ["IMAX", "CINEMA", "MOVIE", "PVR", "INOX", "NETFLIX", "SPOTIFY"]),
    ("TRAVEL", ["UBER", "OLA", "RAPIDO", "METRO", "BUS", "TRAIN", "FLIGHT"]),
    ("SHOPPING", ["AMAZON", "FLIPKART", "MYNTRA", "AJIO", "SHOP", "MALL"]),
    ("BILLS", ["ELECTRICITY", "WATER", "GAS", "BROADBAND", "AIRTEL", "JIO", "VI", "RECHARGE"]),
    ("MEDICAL", ["HOSPITAL", "CLINIC", "PHARMA", "MEDIC", "APOLLO"]),
]


def rule_classify(text: str) -> Optional[Tuple[str, float, str]]:
    """
    Returns (category, confidence, reason) if a rule matches, else None.
    Confidence is a heuristic (we'll tune later).
    """
    for category, keywords in RULES:
        hits = [k for k in keywords if k in text]
        if hits:
            confidence = min(0.95, 0.65 + 0.05 * len(hits))
            reason = f"Matched keywords: {', '.join(hits[:5])}"
            return category, confidence, reason
    return None
