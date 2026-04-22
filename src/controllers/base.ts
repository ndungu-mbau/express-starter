export type BaseController = {
    findAll: () => Promise<any[]>;
    find: (query: any) => Promise<any[]>;
    findById: (id: string) => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    delete: (id: string) => Promise<void>;
}
