
import { Text, Html, OrbitControls, PivotControls, TransformControls, Float, MeshReflectorMaterial, Text3D } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three'
import { button,useControls } from "leva";
import { Perf } from "r3f-perf";


export default function Experience()
{
    // const cube = useRef();
    const sphere = useRef();
    const cube = useRef();


    const {position, color, visible,myInterval} = useControls('sphere', {
        position: {
            value: {x:-2, y:0,},
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        myInterval:
        {
            min: 0,
            max:10,
            value: [4,5]
        },
        clickMe: button(() => {
            console.log("You just press a button")
        }),
        choice: {options: ['a','b','c']}
    })

    const {scale} = useControls('cube',{
        scale:
        {
            value: 2.5,
            step: 0.01,
            min: 0,
            max: 5,
        }
    })

    const {textColor, textVisbility} = useControls('text', {
        textColor: 'black',
        textVisbility: true,
    })

    const {perfVisibility} = useControls({
        perfVisibility: true,
    })

   

    return <>

        {/* Intangible implementations */}
        {perfVisibility && <Perf position="bottom-right"/>}
        <OrbitControls makeDefault />
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        {/* Tangible Implementations */}
        {/* Sphere */}
        <PivotControls 
            anchor={[0,0,0]} 
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#fae582']}
            scale={2}
        >
            <mesh position={ [position.x, position.y, 0] } ref={sphere} visible={visible}>
                <sphereGeometry />
                <meshStandardMaterial color={color} />
                <Html position={[2,0,0]} wrapperClass="label" center distanceFactor={8} occlude={[sphere]}>
                    <h3>A-OK Pendant</h3>
                    <p>£641</p>
                </Html>
            </mesh>
        </PivotControls>
        
        {/* Cube */}
        <mesh ref={cube} scale={ scale } position-x={2}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        {/* mode can be scale, rotate or translate  */}
        <TransformControls object={cube} mode="translate"/>

        {/* Floor */}
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="#59981A" /> */}
            <MeshReflectorMaterial resolution={512} blur={[1000,1000]} mixBlur={1} mirror={0.75} color="#C0C0C0"/>
        </mesh>

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

        
       


    </>
}