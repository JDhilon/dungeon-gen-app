import React from 'react'

function Canvas(props) {
    const { draw, options, ...rest } = props
    const canvasRef = useCanvas(draw, options)
  
    // Hard code 200 for now
    return <canvas ref={canvasRef} {...rest}/>
}

// Returns a refernce to a canvas with a specific draw function, and options (such as context)
function useCanvas(draw, options={}) {
    const canvasRef = React.useRef(null)
  
    // useEffect() hook essentially runs right after the component (the Canvas) is mounted
    // Every time we change the draw, the function of the useEffect will be called again for the new draw.
    // The dependencies array will be watched by useEffect and run whenever a dependency is changed
    React.useEffect(() => {
    
        const canvas = canvasRef.current
        const context = canvas.getContext(options.context || '2d')
        let frameCount = 0
        let animationFrameId
        
        // draw(context);
        // All the steps that will be repeated in the animation. render() will be called recursively by the requestAnimationFrame method.
        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        
        // Clean-up. Called right before the component unmount. That way we can ensure that our animation frame is cancelled after our canvas component unmount.
        return () => {
        window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, options])
  
    return canvasRef
}

// TODO: Look at referenced medium article
// Add Resizing function
// Add handling high pixel density screens (like smartphones)
// Look into predraw and postdraw functions (in case we want to do something like clearing the screen, saving it, etc)

export default Canvas

// for reference
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258