import json, hashlib

def generate_hash(transaction, prev_hash):
    txn_string = json.dumps(transaction, sort_keys=True)
    return hashlib.sha256((txn_string + prev_hash).encode()).hexdigest()

def verify_chain(data):
    results = {}
    for dept, dept_data in data.get("departments", {}).items():
        prev_hash = ""
        valid = True
        
        for txn_id, txn in dept_data["transactions"].items():

            stored_hash = txn.get("hash")
            stored_prev = txn.get("prev_hash")
            
            txn_copy = {k: v for k, v in txn.items() if k not in ["hash", "prev_hash"]}
            recomputed_hash = generate_hash(txn_copy, prev_hash)
            
            if stored_hash != recomputed_hash or stored_prev != prev_hash:
                valid = False
                print(f"⚠️ Tampering detected in {dept}/{txn_id}")
                break
            
            prev_hash = stored_hash
        
        results[dept] = "✅ Verified" if valid else "❌ Corrupted"
    return results

with open("transactions_hierarchical_hashed.json") as f:
    data = json.load(f)

results = verify_chain(data)
print(results)
