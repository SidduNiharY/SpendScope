CREATE TABLE users (
  id UUID PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE uploads (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  original_filename VARCHAR(255) NOT NULL,
  storage_path VARCHAR(600) NOT NULL,
  file_hash VARCHAR(64) NOT NULL,
  status VARCHAR(30) NOT NULL,
  error_message TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  parsed_at TIMESTAMPTZ
);

CREATE TABLE categories (
  id UUID PRIMARY KEY,
  user_id UUID NULL REFERENCES users(id),
  name VARCHAR(80) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(20),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, name)
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  upload_id UUID NULL REFERENCES uploads(id),
  txn_time TIMESTAMPTZ NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  direction VARCHAR(10) NOT NULL, -- DEBIT/CREDIT
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  merchant_name VARCHAR(200),
  txn_note TEXT,
  reference_id VARCHAR(80),
  status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
  channel VARCHAR(30) NOT NULL DEFAULT 'UPI',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE transaction_category (
  id UUID PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES transactions(id) UNIQUE,
  category_id UUID NOT NULL REFERENCES categories(id),
  source VARCHAR(20) NOT NULL, -- MODEL/RULE/MANUAL
  confidence NUMERIC(4,3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_txn_user_time ON transactions(user_id, txn_time);
CREATE INDEX idx_txn_user_amount ON transactions(user_id, amount);