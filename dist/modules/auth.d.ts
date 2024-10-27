export declare function comparePasswords(password: string, hash: string): Promise<boolean>;
export declare function hashPassword(password: string): Promise<string>;
export declare const createJWT: (user: any) => string;
export declare function protect(req: any, res: any, next: any): void;
