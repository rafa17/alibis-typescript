import * as readline from "readline";
import { timeToMinutes } from "./utils/time";
import { CrimeData, Suspect, Activity } from "./structs/types";

// If a suspect can find a continuous period >= crimeDuration between the start and end of the crime.

function hasAlibi(crime: CrimeData, suspect: Suspect): boolean {
  const blockedIntervals: [number, number][] = [];

  //store all the intervals the suspect couldn't be at the crime
  for (const act of suspect.activities) {
    const blockStart = act.start - act.distance;
    const blockEnd = act.end + act.distance;
    blockedIntervals.push([blockStart, blockEnd]); // blocked intervals stored here
  }

  //merge the overlapping blocked invervals and sort them for simplicity 
  blockedIntervals.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (let i = 0; i < blockedIntervals.length; i++) {
    const [currStart, currEnd] = blockedIntervals[i];

    if (!merged.length) {
      merged.push([currStart, currEnd]);
    } else {
      const lastIndex = merged.length - 1;
      const [prevStart, prevEnd] = merged[lastIndex];

      if (currStart <= prevEnd) {
        // Overlap, so it combines into a single block
        const newEnd = Math.max(prevEnd, currEnd);
        merged[lastIndex] = [prevStart, newEnd];
      } else {
        // No overlap
        merged.push([currStart, currEnd]);
      }
    }
  }

  //check if there is a possible block of time the suspect could've done the crime
  let currentTime = crime.crimeStart;

  for (const [blockS, blockE] of merged) {
    if (blockS > currentTime) {
      const gapSize = blockS - currentTime;
      if (gapSize >= crime.crimeDuration) {
        // big enough gap to commit the crime
        return false; // no alibi
      }
    }
    if (blockE > currentTime) {
      currentTime = blockE;
    }
    if (currentTime > crime.crimeEnd) {
      break;
    }
  }

  //final block check , from the suspect last activity (currentTime) until the crime end.
  if (currentTime < crime.crimeEnd) {
    const gapSize = crime.crimeEnd - currentTime;
    if (gapSize >= crime.crimeDuration) {
      // no alibi
      return false;
    }
  }

 //alibi
  return true;
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines: string[] = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  //Parse crime data:
  const [Ts, Te, C] = lines[0].split(" ");
  const crime: CrimeData = {
    crimeStart: timeToMinutes(Ts),
    crimeEnd: timeToMinutes(Te),
    crimeDuration: Number(C),
  };

  //Number of suspects 
  const numSuspects = Number(lines[1]);
  let idx = 2;
  const suspects: Suspect[] = [];

  //For each suspect, read their activities
  for (let s = 0; s < numSuspects; s++) {
    const activityCount = Number(lines[idx]);
    idx++;

    const acts: Activity[] = [];

    for (let a = 0; a < activityCount; a++) {
      const [startStr, endStr, distStr] = lines[idx].split(" ");
      idx++;

      acts.push({
        start: timeToMinutes(startStr),
        end: timeToMinutes(endStr),
        distance: Number(distStr),
      });
    }
    suspects.push({ activities: acts });
  }

  //For each suspect, print "yes" if they have an alibi, otherwise "no"
  for (const suspect of suspects) {
    const alibi = hasAlibi(crime, suspect);
    console.log(alibi ? "yes" : "no");
  }
});
