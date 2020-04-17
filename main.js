const key = 'DEMO_KEY'
const baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' //curiosity/photos?earth_date=2015-6-3&camera=fhaz&api_key=DEMO_KEY //example of later path

const selectRover = (name) => { //generates different options to select based on selected rover
    rover = name
    let html=
    `
    <nav>
        <div id='nav-bar'>
                <img src="arrow.png" id="back-arrow" alt="&larr;" onclick="goBack()">
    `
    if(rover=='curiosity')
    {
        html+=
            `
            <select id="cameras" name="camera">
                <option value="navcam">Navigation Camera</option>
                <option value="fhaz">Front Hazard Avoidance Camera</option>
                <option value="rhaz">Rear Hazard Avoidance Camera</option>
                <option value="mast">Mast Camera</option>
                <option value="chemcam">Chemistry and Camera Complex</option>
                <option value="mahli">Mars Hand Lens Imager</option>
                <option value="mardi">Mars Descent Imager</option>
                <option value="all">All cameras</option>
            </select>
                
            <input type="date" id="date" value="2013-08-06" min="2012-08-06" pattern="\\d{4}-\\d{2}-\\d{2}">

            <button onclick="discover()">Discover images</button>
            </div>
            </nav>
            <main>
                <div id="lightbox" onclick="hide()">
                    <img id="zoomed">
                </div>
                <div id="imgs">
                
                </div>
            </main>
            `
    }
    else if(rover=='opportunity'){
        html+=
        `
        <select id="cameras" name="camera">
            <option value="navcam">Navigation Camera</option>
            <option value="fhaz">Front Hazard Avoidance Camera</option>
            <option value="rhaz">Rear Hazard Avoidance Camera</option>
            <option value="pancam">Panoramic Camera</option>
            <option value="minites">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
            <option value="all">All cameras</option>
        </select>
            
        <input type="date" id="date" value="2005-01-26" min="2004-01-26" max="2018-06-09" pattern="\\d{4}-\\d{2}-\\d{2}">

        <button onclick="discover()">Discover images</button>
        </div>
        </nav>
        <main>
            <div id="lightbox" onclick="hide()">
                <img id="zoomed">
            </div>
            <div id="imgs">
            
            </div>
        </main>
        `
    }
    else if(rover=='spirit'){
        html+=
        `
        <select id="cameras" name="camera">
            <option value="navcam">Navigation Camera</option>
            <option value="fhaz">Front Hazard Avoidance Camera</option>
            <option value="rhaz">Rear Hazard Avoidance Camera</option>
            <option value="pancam">Panoramic Camera</option>
            <option value="minites">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
            <option value="all">All cameras</option>
        </select>
            
        <input type="date" id="date" value="2005-01-05" min="2004-01-05" max="2010-03-21" pattern="\\d{4}-\\d{2}-\\d{2}">

        <button onclick="discover()">Discover images</button>
        </div>
        </nav>
        <main>
            <div id="lightbox" onclick="hide()">
                <img id="zoomed">
            </div>
            <div id="imgs">

            </div>
        </main>
        `
    }
    else{
        html+='<p>Error - invalid rover</p> </div> </nav>'
    }

    document.body.innerHTML=html
    document.body.removeAttribute('style')

    console.log('the rover is: '+rover)
}

const goBack = () => {
    document.body.setAttribute('style', 'overflow: hidden')
    document.body.innerHTML=
    `
    <nav>
        <div onclick="selectRover('curiosity')" class="rover" style="background-position:center center; background-image: url(https://cdn.pixabay.com/photo/2016/03/06/22/10/mars-rover-1241274_960_720.jpg);">
            <h2>Curiosity</h2>
            <p>Land Date: August 6, 2012<br>Mission still in progress<br> </p>
        </div>
        <div onclick="selectRover('opportunity')" class="rover" style="background-position:center bottom; background-image: url(https://images.unsplash.com/photo-1532954751162-d1b6d1f3b1a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&auto=compress&h=900&q=80);">
            <h2>Opportunity</h2>
            <p>Land Date: January 25, 2004<br>Communication lost: 10 June 2018</p>
        </div>
        <div onclick="selectRover('spirit')" class="rover" style="background-position:45% top; background-image: url(https://cdn.pixabay.com/photo/2012/01/09/13/01/mars-11656_1280.jpg);">
            <h2>Spirit</h2>
            <p>Land Date: January 4, 2004<br>Communication lost: March 22, 2010</p>
        </div>
    </nav>
    `
}

async function discover(){
    let camera = '&camera='
    if(document.querySelector('#cameras').value != 'all')
    {
        camera += document.querySelector('#cameras').value
    }
    else{
        camera = ''
    }
    
    const date = document.querySelector('#date').value

    document.querySelector('#imgs').innerHTML = ''

    try {
        const response = await fetch(`${baseURL}${rover}/photos?earth_date=${date}${camera}&api_key=${key}`)
        const data = await response.json()
        if(data.photos.length == 0)
        {
            document.querySelector('#imgs').innerHTML = '<p>No images found</p>'
        }
        else{
            let target = document.querySelector('#imgs')
            data.photos.forEach(photo => {
                renderPhoto(photo.img_src, target )
            })
            console.log(data)
        }
        
    } catch (err) {
        console.warn(err)
        document.querySelector('#imgs').innerHTML='<p>Error occured</p>'
    }
}

const renderPhoto = (url, target) => {
    let img = document.createElement('img')
    img.src = url
    img.setAttribute('class', 'img')
    img.setAttribute('onclick', `zoom('${url}')`)
    target.appendChild(img)
}

const zoom = (url) => {
    //change lightbox's img src
    document.querySelector('#zoomed').setAttribute('src', `${url}`)

    //turn on lighbox (with img inside)
    document.querySelector('#lightbox').setAttribute('class', 'active')
}

const hide = () => {
    document.querySelector('#lightbox').removeAttribute('class')
}