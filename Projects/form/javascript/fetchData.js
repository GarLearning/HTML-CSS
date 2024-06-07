class SearchCategories {
    async execute({ qtd: qtd=0, name: name= "" }) {
        if(name) {
            const dataFiltered = data.find(element => element.system.includes(name))
            dataFiltered.slice(qtd, (qtd+10))
            return JSON.stringify(dataFiltered)
        }

        const dataFilteredQtd = data.slice(qtd, (qtd+10))
        return JSON.stringify(dataFilteredQtd)
        
    }
}