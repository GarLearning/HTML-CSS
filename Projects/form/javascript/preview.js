const paramsString = location.search
const searchParams = new URLSearchParams(paramsString)

if(searchParams.get("categories")) {
    const parseSearchParams = JSON.parse(searchParams.get("categories"))

    appendPreviewTrCategory(parseSearchParams)
}

function appendPreviewTrCategory(items) {
    const bodyTable = document.querySelector("#preview-content > table > tbody")

    bodyTable.innerHTML = ''

    for(let item of items) {
        bodyTable.innerHTML += `
        <tr>
            <td><span>${item.system} > ${item.type} > ${item.category}</span></td>
            <td><div class="dots"></div></td>
            <td><div class="dots"></div></td>
            <td><div class="dots"></div></td>
            <td><span>-</span></td>
        </tr>
        `
    }
}

function updatePreviewStatus(data) {
    const allBodyTr = Array.from(document.querySelector("#preview-content > table > tbody")
        .querySelectorAll("tr")).map(item => item.querySelectorAll("td"))
    
    if(data.length !== allBodyTr.length) {
        return
    }

    const htmlStatus = {
        'ok': '<i class="gg-check-o"></i>',
        'error': '<i class="gg-add"></i>',
        'waiting': '<div class="dots"></div>',
        'ticketNum': '<span>-</span>',
        ticketNumber (num='') {
            if(num) {
                this.ticketNum = `<span>${num}</span>`
            }
        }
    }

    for(let index in allBodyTr) {
        allBodyTr[index][1].innerHTML = htmlStatus[data[index]['create']]
        allBodyTr[index][2].innerHTML = htmlStatus[data[index]['fill']]
        allBodyTr[index][3].innerHTML = htmlStatus[data[index]['link']]

        htmlStatus.ticketNumber(data[index]['ticketNum'])
        allBodyTr[index][4].innerHTML = htmlStatus['ticketNum']
    }
}