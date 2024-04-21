interface exerciseCalc {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerValues {
    target: number,
    exerciseHours: Array<number>
}

export const parseArguments = (exerciseHoursP: Array<number>, targetP: number): ExerValues => {
    const exerciseHours =  exerciseHoursP;
    const target = Number(targetP);
    const check = exerciseHours.map(n => isNaN(n));
    if(check.includes(false) && !isNaN(target)) return {target, exerciseHours};
    else throw new Error("Some of arguments are not number");
};

export const exerciseCal = ( target: number, exerciseHours: Array<number>): exerciseCalc => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(n => n>0).length;
    const average = (exerciseHours.reduce((a, b) => (a+b)))/periodLength;
    const success = average >= target;
    let rating, ratingDescription;
    if(average < target) {
        rating = 1;
        ratingDescription = "not too bad but could be better";
    }
    else if (average === target) {
        rating = 2; 
        ratingDescription = "ok";
    }
    else {
        rating = 3;
        ratingDescription = "good";
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};