import requests

HEADERS = {"User-Agent": "ArticoEducationalBot/1.0"}

def search_commons(query, limit=5):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": query,
        "srnamespace": "6",
        "srlimit": limit,
        "format": "json"
    }
    r = requests.get(url, params=params, headers=HEADERS, timeout=10)
    data = r.json()
    return [item["title"] for item in data.get("query", {}).get("search", [])]

if __name__ == "__main__":
    import sys
    q = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "exercise"
    for t in search_commons(q):
        print(t)
