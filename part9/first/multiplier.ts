const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
multiplicator(a, b, `Multiplied numbers ${a} and ${b}, the result is:`);