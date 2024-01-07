
import { Environment,Sky,Text, Html, OrbitControls, PivotControls, TransformControls, Float, useHelper, SoftShadows, ContactShadows, Lightformer } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three'
import { button,useControls } from "leva";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";


export default function Experience()
{
    
    // const cube = useRef();
    const sphere = useRef();
    const cube = useRef();

    const directionalLight = useRef();
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

    // Animation 
    useFrame((state,delta) => {
        cube.current.rotation.y += delta * 0.2
    })


    const {color, visible,myInterval} = useControls('sphere', {
        
        color: '#ff0000',
        visible: true,
        // myInterval:
        // {
        //     min: 0,
        //     max:10,
        //     value: [4,5]
        // },
        // clickMe: button(() => {
        //     console.log("You just press a button")
        // }),
        // choice: {options: ['a','b','c']}
    })

    const {scale} = useControls('cube',{
        scale:
        {
            value: 2,
            step: 0.01,
            min: 0,
            max: 5,
        }
    })

    const {textColor, textVisbility} = useControls('text', {
        textColor: 'black',
        textVisbility: true,
    })

    // const {sunPosition} = useControls('sky ', {
    //     sunPosition: {value: [1,2,3]}
    // })

    

    const { contactcolor, opacity, blur } = useControls('contact shadows', {
        contactcolor: '#4b2709',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 },
    })

    const {envMapIntensity, envHDRI,envMapHeight, envMapRadius, envMapScale} = useControls('env', {
        envMapIntensity : {value:1, min: 0, max: 12},
        envHDRI: {options: ['sunset', 'city','night','apartment', 'dawn','lobby','forest','park', 'studio', 'warehouse' ]},
        envMapHeight: {value: 7, min:0, max:100},
        envMapRadius: {value: 28, min: 10, max:1000},
        envMapScale: {value:100, min:10, max: 1000},
    })

    // const {perfVisibility} = useControls({
    //     perfVisibility: true,
    // })


   

    return <>

        {/* <Environment 
            background
            files={ [
                    './environmentMaps/1/px.jpg',
                    './environmentMaps/1/nx.jpg',
                    './environmentMaps/1/py.jpg',
                    './environmentMaps/1/ny.jpg',
                    './environmentMaps/1/pz.jpg',
                    './environmentMaps/1/nz.jpg',
                ] }
        /> */}

        {/* <Environment 
            background
            files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        /> */}

        <Environment
            // background
            preset={envHDRI} 
            ground={{ 
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
             }}>
            <Lightformer 
                position-z={-5}
                scale={10}
                color={"red"}
                intensity={10}
                />
            {/* <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={"red"}/>
            </mesh> */}
        </Environment>

        {/* Intangible implementations */}
        <color args={ ['#a0c8de'] } attach="background"/>   
        {/* {perfVisibility && <Perf position="bottom-right"/>} */}
        <OrbitControls makeDefault />

        {/* <directionalLight 
            position={ sunPosition} 
            intensity={ 4.5 } 
            ref={directionalLight} 
            castShadow 
            shadow-mapSize= {[1024,1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            /> */}
        
        {/* <ambientLight intensity={ 1.5 } /> */}
        {/* <Sky sunPosition={sunPosition}/> */}

        <ContactShadows
            position={[0,0,0]}
            scale={10}
            resolution={512}
            far={5}
            color={contactcolor}
            opacity={opacity}
            blur={blur}
            frames={1} 

            />

        
         {/*It is great to mix the BakeShadows and Softshadows together for performance purpose, however you will see that the animation may   */}
        {/* <BakeShadows />    */}
        {/* <SoftShadows size={50} samples={10} focus={0} /> */}

        {/* Tangible Implementations */}
        {/* Sphere */}
        
        {/* <PivotControls 
            anchor={[0,0,0]} 
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#fae582']}
            scale={2}
        > */}
            {/* <mesh position={ [position.x, position.y, 0] } ref={sphere} visible={visible} castShadow>
                <sphereGeometry />
                <meshStandardMaterial color={color} /> */}
                {/* <Html position={[2,0,0]} wrapperClass="label" center distanceFactor={8} occlude={[sphere, cube]}>
                    <h3>A-OK Pendant</h3>
                    <p>£641</p>
                </Html> */}
            {/* </mesh> */}
        {/* </PivotControls> */}
        
        {/* Cube */}
        {/* <mesh ref={cube} scale={ scale } position-x={2}  castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh> */}
        {/* mode can be scale, rotate or translate  */}
        {/* <TransformControls object={cube} mode="translate"/> */}

        {/* Floor */}
        {/* <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } receiveShadow>
            <planeGeometry />
            <meshStandardMaterial color="#59981A" /> */}
            {/* <MeshReflectorMaterial resolution={512} blur={[1000,1000]} mixBlur={1} mirror={0.75} color="#C0C0C0"/> */}
        {/* </mesh> */}

        {/* --------------------------------- */}

        {/* original */}

        {/* Cube */}
        <mesh ref={cube} scale={ scale } position-y={1} position-x={2}  castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>

        {/* Sphere */}

        <mesh position-y={1} position-x={-2} ref={sphere} visible={visible} castShadow>
                <sphereGeometry />
                <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} />
            </mesh>

        {/* Floor */}
        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } receiveShadow> */}
            {/* <planeGeometry /> */}
            {/* <meshStandardMaterial color="#59981A" envMapIntensity={envMapIntensity} /> */}
            {/* <MeshReflectorMaterial resolution={512} blur={[1000,1000]} mixBlur={1} mirror={0.75} color="#C0C0C0"/> */}
        {/* </mesh> */}




        {/* Text */}
        {textVisbility && <Float
            speed={2}>
            <Text 
                font="./Neue-Haas-Unica-W06-Bold.woff" 
                color={textColor} 
                fontSize={2.5} 
                position-y={4}
                textAlign="center"
                fontStyle="italic"
                >
                homer
            </Text>
        </Float>}



        {/* Staging */}
        {/* <Stage shadows={{ type: 'contact', opacity:0.2, blur:3 }} environment="sunset" preset="portrait" intensity={6}>
            <mesh ref={cube} scale={ scale } position-y={1} position-x={2}  castShadow>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
            </mesh>

            

            <mesh position-y={1} position-x={-2} ref={sphere} visible={visible} castShadow>
                    <sphereGeometry />
                    <meshStandardMaterial color={color} envMapIntensity={envMapIntensity} />
            </mesh>
        </Stage> */}
        
       


    </>
}