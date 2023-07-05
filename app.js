const display = document.querySelector('.display')
const btns = Array.from(document.querySelectorAll('.button'))
let fontReduced = false

function reduceFontSize_Or_ScrollToEnd (d) {
    if (d.scrollWidth !== d.offsetWidth) {
        // Если скролл появляется, шрифт должен уменьшиться(скролл при этом тоже уберется)
        if (!fontReduced) {
            d.classList.add('reduceFontSize')
            fontReduced = true
        } else {
            // Если скролл появился повторно, то теперь при каждом изменении длины видимой строки в дисплее скролл будет устанавливаться в самый конец, чтобы удобно видеть изменения
            d.scrollLeft = d.scrollWidth
        }
    }
}

btns.map((btn) => {
    btn.addEventListener('click', (e) => {
        arr = display.innerHTML.split(' ')
        const lastEl = arr[arr.length-1]
        const firsrEl = arr[0]
                
        switch(e.target.id) {
            case 'CE':
                display.innerHTML = '0'
                if (display.classList.contains('reduceFontSize')) {
                    display.classList.remove('reduceFontSize')
                    fontReduced = false
                }
                break

            case 'negative':
                if (parseInt(lastEl) || Math.abs(parseInt(lastEl)) === 0) {
                    arr.pop()
                    if (lastEl === firsrEl) {
                        display.innerHTML = lastEl[0] === '-'? arr.join(' ') + lastEl.slice(1) : arr.join(' ') + '-' + lastEl
                    } else {
                        display.innerHTML = lastEl[0] === '-'? arr.join(' ') + ' ' + lastEl.slice(1) : arr.join(' ') + ' -' + lastEl
                    }
                } else {
                    display.innerHTML = lastEl === '-'? display.innerHTML.slice(0, -1) : display.innerHTML + '-'
                }
                reduceFontSize_Or_ScrollToEnd(display)
                break

            case 'counting':
                display.innerHTML = display.innerHTML === '69'? '<div class="feature">Соня зепка))&#9825</div>;' : eval(display.innerHTML)
                break
                
            default:
                if (Math.abs(parseFloat(display.innerHTML)) === 0 && (display.innerHTML !== '0.' && display.innerHTML !== '-0.') && e.target.innerHTML !== '.' && !e.target.classList.contains('btn-orange')) {
                    display.innerHTML = e.target.innerHTML
                }  else if (e.target.classList.contains('btn-orange')) {
                    display.innerHTML = parseInt(lastEl)? display.innerHTML + ` ${e.target.innerHTML} ` : display.innerHTML.slice(0, -2) + ` ${e.target.innerHTML} ` 
                } else {
                    if (e.target.innerHTML === '.' || e.target.innerHTML === '%') 
                        display.innerHTML = (lastEl[lastEl.length-1] === '.' || lastEl[lastEl.length-1] === '%')? display.innerHTML.slice(0, -1) + e.target.innerHTML : display.innerHTML + e.target.innerHTML
                    else 
                        display.innerHTML += e.target.innerHTML
                }
                reduceFontSize_Or_ScrollToEnd(display)
        }
    })
})