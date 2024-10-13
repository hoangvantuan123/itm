import subprocess
import os
import time
import logging
from datetime import datetime
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Dict, Any

# Thiết lập logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("server_manager.log"),
        logging.StreamHandler()
    ]
)

load_dotenv()

class ServerManager:
    def __init__(self, server: Dict[str, Any]):
        self.path = server["path"]
        self.script = server["script"]
        self.log_file = server["log"]
        self.port = server["port"]
        self.process = None

    def log_message(self, message: str):
        with open(self.log_file, "a") as log:
            log.write(f"[{datetime.now()}] {message}\n")

    def run_server(self):
        while True:
            try:
                with open(self.log_file, "a") as log:
                    self.process = subprocess.Popen(
                        ["yarn", "run", self.script],
                        cwd=self.path,
                        env={**os.environ, "PORT": str(self.port)},
                        stdout=log,
                        stderr=log,
                        text=True,
                    )
                    logging.info(f"Server tại {self.path} đang chạy (PID: {self.process.pid}) trên cổng {self.port}")
                    self.log_message(f"Server tại {self.path} đang chạy (PID: {self.process.pid}) trên cổng {self.port}")

                    self.process.wait()  

                    if self.process.returncode != 0:
                        logging.error(f"Lỗi: Mã thoát {self.process.returncode}")
                        self.log_message(f"Lỗi: Mã thoát {self.process.returncode}")

            except Exception as e:
                logging.error(f"Lỗi khi khởi chạy server: {e}")
                self.log_message(f"Lỗi khi khởi chạy server: {e}")

            logging.info(f"Khởi động lại server tại {self.path} sau 5 giây...")
            time.sleep(5)  # Thời gian chờ trước khi khởi động lại server

def main():
    ports = [
        os.getenv("SERVER1_PORT", 5000),
        os.getenv("SERVER2_PORT", 5050),
        os.getenv("SERVER3_PORT", 4000),
    ]

    servers = [
        {"path": Path("./server_user_p_v15"), "script": "start:prod", "log": f"logs/server1/server1_log_{datetime.now().date()}.txt", "port": ports[0]},
        {"path": Path("./server_hr_recruitment"), "script": "start:prod", "log": f"logs/server2/server2_log_{datetime.now().date()}.txt", "port": ports[1]},
        {"path": Path("./server_import_export"), "script": "start:prod", "log": f"logs/server3/server3_log_{datetime.now().date()}.txt", "port": ports[2]},
    ]

    server_managers = [ServerManager(server) for server in servers]

    with ThreadPoolExecutor(max_workers=len(server_managers)) as executor:
        executor.map(lambda manager: manager.run_server(), server_managers)

if __name__ == "__main__":
    main()
