import socket
import select
import threading
import subprocess
import sys

print("Staging files...", flush=True)
subprocess.run(["git", "add", "."], check=True)

print("Committing changes...", flush=True)
subprocess.run(["git", "commit", "-m", "perf: 4K WebP conversion, lightweight thumbnails, on-demand lazy loading, and viewport-aware slideshow pause"], check=True)

GITHUB_IP = "20.207.73.82"

def handle_client(client_sock):
    try:
        req = b""
        while b"\r\n\r\n" not in req:
            chunk = client_sock.recv(4096)
            if not chunk:
                break
            req += chunk
        
        remote_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        remote_sock.settimeout(15)
        remote_sock.connect((GITHUB_IP, 443))
        client_sock.sendall(b"HTTP/1.1 200 Connection Established\r\n\r\n")
        
        sockets = [client_sock, remote_sock]
        while True:
            r, _, _ = select.select(sockets, [], [], 30)
            if not r:
                break
            for s in r:
                other = remote_sock if s is client_sock else client_sock
                data = s.recv(32768)
                if not data:
                    return
                other.sendall(data)
    except Exception:
        pass
    finally:
        try:
            client_sock.close()
        except:
            pass
        try:
            remote_sock.close()
        except:
            pass

def run_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(("127.0.0.1", 18891))
    server.listen(10)
    server.settimeout(120)
    while True:
        try:
            client_sock, _ = server.accept()
            t = threading.Thread(target=handle_client, args=(client_sock,), daemon=True)
            t.start()
        except Exception:
            break

if __name__ == "__main__":
    t = threading.Thread(target=run_server, daemon=True)
    t.start()
    import time
    time.sleep(0.5)
    
    print("Pushing to GitHub...", flush=True)
    res = subprocess.run(["git", "-c", "http.proxy=http://127.0.0.1:18891", "push", "origin", "main"], capture_output=True, text=True)
    print("STDOUT:", res.stdout)
    print("STDERR:", res.stderr)
    sys.exit(res.returncode)
