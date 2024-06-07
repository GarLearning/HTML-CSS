const openCategories = document.querySelector("#open-categories")
const categoriesContent = document.querySelector("#categories-contents-identifier")
const searchCategories = document.querySelector("#search-categories")

const systemsOptions = document.querySelector("#menu-list-system")
const typeOptions = document.querySelector("#menu-list-type")
const categoriesOptions = document.querySelector("#menu-list-categories")

const categoriesSelected = []
const tempCategories = []

const displaySelectedCategories = document.querySelector("#display-selected-category")

systemsOptions.addEventListener('scroll', async ()=> {
    offsetElementHeight = systemsOptions.offsetHeight
    scrollHeight = systemsOptions.scrollHeight
    currentScrollPosition = systemsOptions.scrollTop + 95

    if(offsetElementHeight >= 95 && scrollHeight == currentScrollPosition) {
        elementsCount = systemsOptions.querySelectorAll('li').length

        const searchCategories = new SearchCategories()
        const searchResponse = JSON.parse(await searchCategories.execute({ qtd: elementsCount }))

        for(item of searchResponse) {
            liBuilder(systemsOptions, [item.system])            
        }

        searchResponse.forEach( item => tempCategories.push(item))
        selectSystem(tempCategories)
    }
})

openCategories.addEventListener('click', async () => {
    tempCategories.splice(0,tempCategories.length)
    document.querySelector("#selected-categories > li") && (displaySelectedCategories.style.display = 'flex')

    categoriesContent.classList.toggle("categories-contents-hide")
    const containsClass = categoriesContent.classList.contains("categories-contents-hide")

    if (!containsClass) {
        systemsOptions.innerHTML = typeOptions.innerHTML = categoriesOptions.innerHTML = ""

        const searchCategories = new SearchCategories()
        const searchResponse = JSON.parse(await searchCategories.execute({}))

        for(item of searchResponse) {
            liBuilder(systemsOptions, [item.system])            
        }
        
        searchResponse.forEach( item => tempCategories.push(item))
        selectSystem(tempCategories)
    } else {
        displaySelectedCategories.style.display === 'flex' && (displaySelectedCategories.style.display = 'none')
    }   
})

searchCategories.addEventListener('keyup', async (event) => {
    tempCategories.splice(0,tempCategories.length)
    const inputValue = event.currentTarget.value
    systemsOptions.innerHTML = typeOptions.innerHTML = categoriesOptions.innerHTML = ""

    const searchCategories = new SearchCategories()
    const searchResponse = JSON.parse(await searchCategories.execute({ name: inputValue }))

    if(!searchResponse.length) {
        return liBuilder(systemsOptions, ['Not system found'])
    }

    for(item of searchResponse) {
        liBuilder(systemsOptions, [item.system])            
    }

    searchResponse.forEach( item => tempCategories.push(item))
    selectSystem(tempCategories)
})

function selectSystem(allItems) {
    const allSystemsOptions = systemsOptions.querySelectorAll("li")

    for(let element of allSystemsOptions) {
        element.addEventListener('click', (event) => {
            allSystemsOptions.forEach(item => {
                if(item !== event.target) {
                    item.classList.remove("selected-item")
                }
            })

            event.target.classList.add("selected-item")

            actualSelected = {
                system
            }

            index = Array.from(allSystemsOptions).indexOf(event.currentTarget)
            selectType(allItems[index])
        })
    }
}

function selectType(allItems) {
    typeItems = {...allItems}
    categoriesOptions.innerHTML = ''
    typeOptions.innerHTML = ''

    for(let item of typeItems.categories) {
        liBuilder(typeOptions, [item.type])
    }
    
    const allTypesOptions = typeOptions.querySelectorAll("li")
    for(let element of allTypesOptions) {
        element.addEventListener('click', (event) => {
            allTypesOptions.forEach(item => {
                if(item !== event.target) {
                    item.classList.remove("selected-item")
                }
            })
    
            event.target.classList.add("selected-item")
            
            index = Array.from(allTypesOptions).indexOf(event.currentTarget)
            typeItems.type = event.target.textContent
            typeItems.category = allItems.categories[index].category

            delete typeItems.categories

            selectCategory(typeItems)
        })
    }
}

function selectCategory(elementData) {
    categoryItems = {...elementData}
    categoriesOptions.innerHTML = ''
    liBuilder(categoriesOptions, categoryItems.category)

    const allCategoriesOptions = categoriesOptions.querySelectorAll("li")
    for(let element of allCategoriesOptions) {
        element.addEventListener('click', (event) => {
            allCategoriesOptions.forEach(item => {
                if(item !== event.target) {
                    item.classList.remove("selected-item")
                }
            })
    
            event.target.classList.add("selected-item")
            
            categoryItems.category = event.target.textContent

            selectedCategory(categoryItems)
        })
    }
}

function selectedCategory(objectedSelected) {
    categoriesSelected.push({...objectedSelected})
    const categoriesSelectedInput = document.querySelector("#categories")
    categoriesSelectedInput.value = JSON.stringify(categoriesSelected)

    displaySelectedCategories.style.display === 'none' && (displaySelectedCategories.style.display = 'flex')

    const contentCategoriesSelected = document.querySelector("#selected-categories")
    if(contentCategoriesSelected.querySelector("p")) {
        contentCategoriesSelected.firstElementChild.remove()
    }


    liBuilderSelectedCategory(contentCategoriesSelected, objectedSelected)

    let allCategoriesSelected = Array.from(document.querySelectorAll("#selected-categories > li"))
    
    const removeElement = allCategoriesSelected.map(element => element.querySelector("div"))

    removeElement.forEach(element => {
        element.addEventListener('click', (event) => {
            const liFromElement = event.currentTarget.parentElement
            const indexRemovedItem = allCategoriesSelected.indexOf(liFromElement)
            liFromElement.remove()
            categoriesSelected.splice(indexRemovedItem, 1)
            categoriesSelectedInput.value = JSON.stringify(categoriesSelected)

            allCategoriesSelected = Array.from(document.querySelectorAll("#selected-categories > li"))
            console.log(categoriesSelected)

            if(!categoriesSelected.length) {
                contentCategoriesSelected.innerHTML += `<p>None Category Selected</p>`
            }
        })
    })
}

function liBuilder (divContent, elements) {
    elements.forEach(element => divContent.innerHTML += `<li title="${element}">${element}</li>` )
}

function liBuilderSelectedCategory(divContent, objectedSelected) {
    divContent.innerHTML += `
        <li class="tag">
            <span>${objectedSelected.system} > ${objectedSelected.type} > ${objectedSelected.category}</span>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path fill="#bec2d3" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
            </div>
        </li>
    `
}