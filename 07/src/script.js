import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

console.log(OrbitControls)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()
// var loader = new THREE.TextureLoader();


// Object
// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 1,2,2),
//     new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}),
// new THREE.MeshBasicMaterial({
//     map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
// })
// )

// const geometry = new THREE.Geometry()

// for (let i = 0; i < 50; i++){
//     for (let j = 0; j < 3; j++){
//         geometry.vertices.push(new THREE.Vector3(
//             (Math.random() - 0.5) * 4,
//             (Math.random() - 0.5) * 4,
//             (Math.random() - 0.5) * 4,
//         ))
//     }
//     const verticesIndex = i * 3
//     geometry.faces.push(new THREE.Face3(
//         verticesIndex,
//         verticesIndex + 1,
//         verticesIndex + 2,
//     ))
// }

// const vertex1 = new THREE.Vector3(0, 0, 0)
// geometry.vertices.push(vertex1)
// const vertex2 = new THREE.Vector3(0, 1, 0)
// geometry.vertices.push(vertex2)
// const vertex3 = new THREE.Vector3(1, 0, 0)
// geometry.vertices.push(vertex3)
//
// const face = new THREE.Face3(0,1,2)
// geometry.faces.push(face)


// const geometry = new THREE.BufferGeometry()
//
// const positionsArray = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ])
//
// const positionsAttribute = new THREE.BufferAttribute(positionsArray,3)

// geometry.setAttribute('position', positionsAttribute)
const geometry = new THREE.BufferGeometry()

const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++){
    positionsArray[i] = (Math.random() - 0.5) * 2
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray,3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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