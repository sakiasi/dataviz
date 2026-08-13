export interface DataPoint {
    year: number;
    value: number;
    country?: string
}

export interface chartData {
    rSquared: number;
    country: string;
    dataPointsCount: number;
    slope: number;
    intercept: number;
    correlation: number;
}