type BaseController = {
    findAll: () => any
    find: (...args: any[]) => any
    findById: (id: any) => any
    create: (...obj: any[]) => any
    update: (id: any, obj: any) => any
    delete: (id: any) => any
}

export {
    BaseController
}