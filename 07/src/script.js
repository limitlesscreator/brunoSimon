import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'
import imageSource from '../static/color.jpg'

// Textures
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
loadingManager.onLoad = () => {
    console.log('onLoaded')
}
loadingManager.onProgress = () => {
    console.log('onProgress')
}
loadingManager.onError = () => {
    console.log('Error')
}
const colorTexture = textureLoader.load('minecraft.png')
// const colorTexture = textureLoader.load('checkerboard-1024x1024.png')
const alphaTexture = textureLoader.load('alpha.jpg')
const heightTexture = textureLoader.load('height.jpg')
const normalTexture = textureLoader.load('normal.jpg')
const ambientOcclusionTexture = textureLoader.load('ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('metalness.jpg')
const roughnessTexture = textureLoader.load('roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
//
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
//
// colorTexture.rotation = Math.PI / 4
// colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// const image = new Image()
// const texture = new THREE.Texture(image)
//
// image.onload = () => {
// texture.needsUpdate = true
// }

// image.src = ' color.jpg'

// Debug
const gui = new dat.GUI({width: 400} )


// Cursor
const cursor = {
    x: 0,
    y: 0
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()
// var loader = new THREE.TextureLoader();



// geometry.setAttribute('position', positionsAttribute)

const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)
console.log(geometry.attributes.uv)
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32, )
// const geometry = new THREE.ConeBufferGeometry(1, 1, 4, )
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32,100)

const parameters = {
    color: 0xffffff,
    spinning: true,
    spin: () => {
        parameters.spinning = !parameters.spinning
    }
}


const material = new THREE.MeshBasicMaterial({
    map: colorTexture,
    // color: parameters.color,
    wireframe: false
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Debug
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation y')
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('elevation x')
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('elevation z')

gui.add(mesh,'visible')
gui.add(material,'wireframe')
// gui.add(mesh.position,'y', - 3, 3,0.01)
// gui.add(mesh.position,'x', - 3, 3,0.01)
// gui.add(mesh.position,'z', - 3, 3,0.01)
gui.addColor(parameters, 'color').onChange(( e) => {
    material.color.set(e)
})

gui.add(parameters, 'spin')
// gui.hide()
gui.close()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitFullscreenElement) {
            canvas.webkitFullscreenElement
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRation = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRation,
//     1 * aspectRation,
//     1,
//     -1,
//     0.1,
//     100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    renderer.setSize(sizes.width, sizes.height)
    if (parameters.spinning){
        mesh.rotation.y += 0.01
        mesh.rotation.x += 0.015
    }
    // Update objects
    // mesh.rotation.y = elapsedTime;
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.y * 3

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2 ) * 3
    // camera.position.y = cursor.y * 5

    // camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// 14.38