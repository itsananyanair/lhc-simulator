import * as THREE from 'https://cdn.skypack.dev/three'
import { Howl } from 'https://cdn.skypack.dev/howler'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('lhcCanvas') })
renderer.setSize(window.innerWidth, window.innerHeight)

const torus1 = new THREE.Mesh(
  new THREE.TorusGeometry(10, 0.1, 16, 100),
  new THREE.MeshBasicMaterial({ color: 0x00ffff })
)
const torus2 = new THREE.Mesh(
  new THREE.TorusGeometry(10, 0.1, 16, 100),
  new THREE.MeshBasicMaterial({ color: 0xff00ff })
)
scene.add(torus1, torus2)

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 10, 10)
scene.add(light)

camera.position.z = 25

const collisionSound = new Howl({ src: ['assets/collision.mp3'], volume: 0.5 })

let running = false
let speed = 1
let energy = 7
let muted = false

document.getElementById('startBtn').onclick = () => running = !running
document.getElementById('muteBtn').onclick = () => muted = !muted
document.getElementById('energy').oninput = (e) => energy = parseFloat(e.target.value)
document.getElementById('speed').oninput = (e) => speed = parseFloat(e.target.value)

function animate() {
  requestAnimationFrame(animate)
  if (running) {
    torus1.rotation.z += speed * 0.01
    torus2.rotation.z -= speed * 0.01

    const angle = torus1.rotation.z % (2 * Math.PI)
    const points = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
    if (points.some(p => Math.abs(p - angle) < 0.05)) {
      if (!muted) collisionSound.play()
    }
  }
  renderer.render(scene, camera)
}
animate()
