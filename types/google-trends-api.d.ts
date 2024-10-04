
declare module 'google-trends-api' {
    export function dailyTrends(options: { geo: string, trendDate: Date }): Promise<string>;
  
    export function interestByRegion(options: { keyword: string; geo: string }): Promise<string>;
  
    // export function interestOverTime(options: { keyword: string[]; geo: string, startTime: Date, endTime: Date }): Promise<string>;
    export function interestOverTime(options: { keyword: string[]; startTime: Date, endTime: Date }): Promise<string>;

    export function relatedTopics(options: { keyword: string; geo: string}): Promise<string>;
    
  
    export function autoComplete(options: { keyword: string}): Promise<string>;
    
      // Add more methods as necessary based on the API you are using.
}