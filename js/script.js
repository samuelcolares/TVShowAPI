const image = document.querySelector('#img')
const title = document.querySelector('.title')
const airing = document.querySelector('.status')
const randomShowButton = document.querySelector('.randomShow')
const inputSearch = document.querySelector('.input')
const circleStatus = document.querySelector('.circle')
const imdbLink = document.querySelector('.imdb-link')
const releaseEnded = document.querySelector('.release')
const genresList = document.querySelector('.genres')

const summary = document.querySelector('summary')

  
async function tvShowLoad(random){
    const config = {
      headers: {
        Accept: 'Application/json',
      },
    }

    const response = await fetch(`https://api.tvmaze.com/shows/${random}`, config)
    const data = await response.json()
    outputRandom(data)

  }





// function tvShowLoad(random) {
//   fetch(`https://api.tvmaze.com/shows/${random}`)
//     .then(response => response.json())
//     .then(outputRandom)
// }

function tvShowSearch(tvShow) {
  fetch(`https://api.tvmaze.com/singlesearch/shows?q=${tvShow}`)
    .then(response => response.json())
    .then(outputSearch)
}

function outputSearch(data) {
  genresList.innerHTML = ''
  output(data)
}

function outputRandom(data) {
  genresList.innerHTML = ''
  output(data)
}


function output(x) {
  image.src = x.image.original
  title.innerText = x.name
  stillAiring(airing, x.status)
  summary.innerHTML = x.summary
  summaryLength(x.summary.length)
  imdbLink.href = `https://www.imdb.com/title/${x.externals.imdb}/`
  const teste = x.ended ? releaseEnded.innerHTML = premieredOrEnded(1, x.ended, x.premiered) : releaseEnded.innerHTML = premieredOrEnded(0, x.ended, x.premiered)
  console.log(x.genres)
  if (x.genres.length === 0) {
    genresList.innerHTML = '<li class="noGenre">Genres not specified</li>'
  } else {
    x.genres.forEach((genre, idx) => {
      if (idx != x.genres.length - 1) {
        genresList.innerHTML += `<li>${genre},</li>`
      } else if (idx == x.genres.length - 1) {
        genresList.innerHTML += `<li>${genre}</li>`
      }
    })
  }
}
function summaryLength(length) {
  if (length < 200) {
    summary.style.textAlign = 'center'
    return
  }
  summary.style.textAlign = 'left'
}

function stillAiring(text, status) {
  text.innerText = status
  circleStatus.classList.remove('TBD')
  circleStatus.classList.remove('ended')
  if (status === 'Ended') {
    circleStatus.classList.add('ended')
    return
  } else if (status === 'To Be Determined') {
    circleStatus.classList.add('TBD')
    return
  }
}

function premieredOrEnded(flag, ended, premiered) {
  const premieredArray = premiered.split('-')
  const premieredYear = premieredArray[0]
  const premieredMonth = premieredArray[1]
  const premieredDay = premieredArray[2]
  if (flag === 1) {
    const endedArray = ended.split('-')
    const endedYear = endedArray[0]
    const endedMonth = endedArray[1]
    const endedDay = endedArray[2]
    return `<span>Premiered:</span><span>${month(premieredMonth)} ${parseInt(premieredDay)},  of ${premieredYear}</span><span>Ended:</span><span>${month(endedMonth)} ${parseInt(endedDay)},  of ${endedYear}</span>`
  } else {
    return `<span>Premiered:</span><span>${month(premieredMonth)} ${parseInt(premieredDay)},  of ${premieredYear}</span>`
  }
}

function month(month) {
  let monthPrinted = ''
  switch (month) {
    case '01': {
      monthPrinted = 'January';
      break;
    }
    case '02': {
      monthPrinted = 'February';
      break;
    }
    case '03': {
      monthPrinted = 'March';
      break;
    }
    case '04': {
      monthPrinted = 'April';
      break;
    }
    case '05': {
      monthPrinted = 'May';
      break;
    }
    case '06': {
      monthPrinted = 'June';
      break;
    }
    case '07': {
      monthPrinted = 'July';
      break;
    }
    case '08': {
      monthPrinted = 'August';
      break;
    }
    case '09': {
      monthPrinted = 'September';
      break;
    }
    case '10': {
      monthPrinted = 'October';
      break;
    }
    case '11': {
      monthPrinted = 'November';
      break;
    }
    case '12': {
      monthPrinted = 'December';
      break;
    }
    default: {
      monthPrinted = '';
      break;
    }
  }
  return monthPrinted

}

function string(x) {
  return x.replace(/\s/g, "%20");
}

window.onload = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1
  tvShowLoad(randomNumber)
}

randomShowButton.onclick = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1
  console.log(randomNumber)
  tvShowLoad(randomNumber)
}

inputSearch.addEventListener('keypress', (e) => {
 if (e.key === 'Enter') {
    const serie = string(e.target.value)
    tvShowSearch(serie)
  }
})

const button = document.querySelector('.btn')
const searchWrapper = document.querySelector('.search')
const container = document.querySelector('.container')


button.addEventListener('click', () => {
  if (!inputSearch.classList.contains(`open`)) {
    inputSearch.classList.add('open')
    searchWrapper.classList.add('open')
  } else if (inputSearch.classList.contains(`open`) && inputSearch.value.length === 0) {
    inputSearch.classList.remove('open')
    searchWrapper.classList.remove('open')
    inputSearch.value = ''
  } else {
    tvShowSearch(inputSearch.value)
  }
})

inputSearch.addEventListener('blur', () => {
  if (inputSearch.value.length === 0) {
    inputSearch.classList.remove('open')
    searchWrapper.classList.remove('open')
    inputSearch.value = ''
  }
})

