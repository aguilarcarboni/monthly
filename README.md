# Monthly

## Software Engineering

### Description

This project is a bill tracker application that allows users to track their bills and expenses.
Has a fully local SQLite database, a fully functional flask API with CRUD operations for bills and expenses, and a fully functional React frontend that allows users to view, add, edit, and delete bills and expenses along with a fully functional authentication system using NextAuth.

### Compiling and Running

Clone the repository
```bash
git clone https://github.com/aguilarcarboni/monthly.git
```

[Install Node](https://nodejs.org/en/download/package-manager)

Verify Node installation
```bash
node -v
npm -v
```

Install yarn
```bash
npm install --global yarn
```

Verify Python installation
```bash
python/python3 --version
```

Install the backend dependencies
```bash
cd server
pip install -r requirements.txt
```

Run the server
```bash
./run.sh

```

Add enviornment file to the repository
```code
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="rBAIu7aeNddKRikxClCFXWQ+JycplaLBsBy71VBf3tw="
```

Build the frontend
```bash
cd ../frontend
yarn
```

Start frontend
```bash
yarn dev
```

### Results
- Scored a 100% in the project.

### created by [@aguilarcarboni](https://github.com/aguilarcarboni), [@JenVicen](https://github.com/JenVicente) and [@Dampmar](https://github.com/Dampmar)
