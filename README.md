# 🕵️ Crime Alibi Checker (TypeScript + Node.js)

This Readme was generated with the help of Generative AI.

This project determines whether a suspect has a valid alibi based on their recorded activities and the crime's time constraints.

## 🚀 Setup Instructions

1. **Clone the repository**:
   ```sh
   git clone https://github.com/rafa17/alibis-typescript
   cd your-repo
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the program**:
   - **Using an input file (`input.txt`)**:
     ```sh
     npm start
     ```

---

## 📥 Input Format

The program expects structured input in the following format:

```
Ts Te C
S
A1
Tj1 Tk1 D1
Tj2 Tk2 D2
...
A2
Tj1 Tk1 D1
...
```

### **Explanation**
- **First line**:  
  - `Ts` → Crime start time (HH:MM)  
  - `Te` → Crime end time (HH:MM)  
  - `C` → Minimum duration of the crime (in minutes)  

- **Second line**:  
  - `S` → Number of suspects  

- **For each suspect**:
  - `A` → Number of activities  
  - Next `A` lines contain:
    - `Tj Tk D`  
      - `Tj` → Start time of an activity (HH:MM)  
      - `Tk` → End time of an activity (HH:MM)  
      - `D` → Travel time (in minutes) between the activity location and the crime scene  

---

## 📝 Example Input (`input.txt`)

```
14:00 17:30 40
3
1
10:00 15:00 120
4
15:05 18:10 30
00:00 09:30 1
18:30 23:59 30
11:40 12:00 15
2
16:15 19:30 20
12:30 14:15 60
```

### 🔍 **Breaking Down the Example**
- **Crime occurs between 14:00 and 17:30**, lasting **at least 40 minutes**.
- **3 suspects**.
- **First suspect** has **1 activity** (from 10:00 to 15:00 at a location **120 minutes away**).
- **Second suspect** has **4 activities** at different locations.
- **Third suspect** has **2 activities**.

---

## 📤 Expected Output

For each suspect, the program outputs:
- `"yes"` → The suspect **has an alibi** and couldn't have committed the crime.
- `"no"` → The suspect **does NOT have an alibi** and might be guilty.

For the sample input above, the expected output is:

```
yes
yes
no
```

---

## 🏗️ How It Works
1. **Parses the crime details** (start time, end time, duration).
2. **Reads all suspects and their activities**.
3. **Determines when each suspect is unavailable**.
4. **Checks if there’s an uninterrupted period of at least `C` minutes within the crime window**.
5. **Outputs `"yes"` or `"no"` for each suspect**.

---

## ⚙️ Technical Details
- **Language**: TypeScript
- **Runtime**: Node.js

---

## 📜 License
MIT License. Feel free to modify and contribute!

---
