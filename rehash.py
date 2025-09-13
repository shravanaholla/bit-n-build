import json, hashlib

def generate_hash(transaction, prev_hash):
    txn_string = json.dumps(transaction, sort_keys=True)
    return hashlib.sha256((txn_string + prev_hash).encode()).hexdigest()

with open("transactions_hierarchical_hashed.json") as f:
    data = json.load(f)

for dept, dept_data in data["departments"].items():
    prev_hash = ""
    for txn_id, txn in dept_data["transactions"].items():
        txn_copy = {k: v for k, v in txn.items() if k not in ["hash", "prev_hash"]}
        txn_hash = generate_hash(txn_copy, prev_hash)
        txn["hash"] = txn_hash
        txn["prev_hash"] = prev_hash
        prev_hash = txn_hash

with open("transactions_hierarchical_hashed_fixed.json", "w") as f:
    json.dump(data, f, indent=4)

print("✅ Hashes regenerated and saved to transactions_hierarchical_hashed_fixed.json")
