// #region DATA
let missingPackage = ''
let currentPackages = 'all'
const packages = [{
  priorityLevel: 'express',
  isFragile: false,
  weight: 2,
  to: 'Sir Harrington IV',
  trackingNumber: '1324kjs',
  potentialMissing: true
},
{
  priorityLevel: 'standard',
  isFragile: true,
  weight: .5,
  to: 'Master Mercutio',
  trackingNumber: '1325sdk',
  potentialMissing: true
},
{
  priorityLevel: 'free',
  isFragile: true,
  weight: .5,
  to: 'Mistress Ravenfeather',
  trackingNumber: 'jffd147',
  potentialMissing: true
},
{
  priorityLevel: 'standard',
  isFragile: false,
  weight: 4,
  to: 'B. Robert Brown',
  trackingNumber: 'acdc145',
  potentialMissing: true
},
{
  priorityLevel: 'express',
  isFragile: true,
  weight: 6,
  to: 'Chancellor Wallace',
  potentialMissing: true
},
{
  priorityLevel: 'standard',
  isFragile: false,
  weight: 5,
  to: 'Sarah Sharm',
  trackingNumber: '8081baz',
  potentialMissing: true
},
{
  priorityLevel: 'free',
  isFragile: true,
  weight: 12,
  to: 'Tae Lien',
  trackingNumber: 'suz2367',
  potentialMissing: true
},
{
  priorityLevel: 'free',
  isFragile: false,
  weight: 2,
  to: 'Some Guy',
  trackingNumber: 'gx382b4',
  potentialMissing: true
},
{
  priorityLevel: 'standard',
  isFragile: true,
  weight: 17,
  to: 'Tim Timmerson',
  trackingNumber: 'gwl6591',
  potentialMissing: true
},
{
  priorityLevel: 'express',
  isFragile: false,
  weight: 3,
  to: 'Anonymous',
  trackingNumber: 'dft5667',
  potentialMissing: true
},
{
  priorityLevel: 'standard',
  isFragile: false,
  weight: 6,
  to: 'My Angel',
  trackingNumber: 'ma3882d',
  potentialMissing: true
},
{
  priorityLevel: 'free',
  isFragile: true,
  weight: 4,
  to: 'Numbuh 4',
  trackingNumber: 'bmn8287',
  potentialMissing: true
},
]
// #endregion

// #region DRAWING BOXES
function drawPackages(arr) {
  let packageButtons = document.getElementById('package-buttons')
  let template = ''

  arr.forEach(p => {
    if (p.potentialMissing) {
      template +=
        `<button class="btn btn-dark mb-3" oncontextmenu="return false;" onclick="guessPackage('${p.to}')">${p.to} - ${p.trackingNumber}</button> `
    } else {
      template +=
        `<button class="btn btn-dark mb-3 disabled" oncontextmenu="return false;" onclick="guessPackage('${p.to}')">${p.to} - ${p.trackingNumber}</button> `
    }
    packageButtons.innerHTML = template
  })
}

function heavyFilter() {
  let heavyPackages = packages.filter(p => p.weight >= 5)
  currentPackages = 'heavy'
  drawPackages(heavyPackages)
}

function priorityFilter() {
  let priorityPackages = packages.filter(p => p.priorityLevel != 'free')
  currentPackages = 'priority'
  drawPackages(priorityPackages)
}

function fragileFilter() {
  let fragilePackages = packages.filter(p => p.isFragile)
  currentPackages = 'fragile'
  drawPackages(fragilePackages)
}
// #endregion
function getRandomPackage() {
  let randomIndex = Math.floor(Math.random() * packages.length)
  let missing = packages[randomIndex]
  missingPackage = missing.to
}
// #region LOGIC
function guessPackage(rec) {
  if (!missingPackage) { return }

  if (rec == missingPackage) {
    alert(`You found the missing package for ${missingPackage}`)
    missingPackage = ''
    return
  } else {
    let maybeMiss = packages.filter(p => p.potentialMissing)
    let guessedIndex = maybeMiss.findIndex(guessed => guessed.to == rec)
    maybeMiss[guessedIndex].potentialMissing = false
  }

  switch (currentPackages) {
    case 'all': drawPackages(packages)
      break
    case 'heavy': heavyFilter()
      break
    case 'priority': priorityFilter()
      break
    case 'fragile': fragileFilter()
  }
}

function resetFilters() {
  currentPackages = 'all'
  drawPackages(packages)
}

function resetGame() {
  packages.forEach(p => p.potentialMissing = true)
  getRandomPackage()
  drawPackages(packages)
}
// #endregion
getRandomPackage()
drawPackages(packages)