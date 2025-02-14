export type CrimeData = {
    crimeStart: number;  // converted from HH:MM to minutes
    crimeEnd: number;    // converted from HH:MM to minutes
    crimeDuration: number; // minium duration to commit the crime
  };
  
  export type Activity = {
    start: number;       // converted from HH:MM to minutes
    end: number;         // converted from HH:MM to minutes
    distance: number; // distance to the crime location in minutes to arrive there
  };
  
  export type Suspect = {
    activities: Activity[];  //stores all the activities of the suspect on the day of crime
  };
  