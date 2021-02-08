import React, {useRef, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Picture from './picture.jpg';

function App() {

	const [mousePos, setMousePos] = React.useState(null);
	const canvasRef = useRef(null);
	const imageEl = useRef(null);
	const setMouseCoordinates = (event) => {
		setMousePos({x: event.clientX, y: event.clientY});
	}
  
  //Setting first eye
	const eye1 = (ctx) => {
		let [w, h] = [canvasRef.current.width, canvasRef.current.height];
		let angle = (mousePos? Math.atan2(mousePos.y-(h/2-40), mousePos.x-(w/2+30)) : null);

		let xMovement = (angle != null ? (Math.cos(angle)*5) : 0);
		let yMovement = (angle != null ? (Math.sin(angle)*5) : 0);
		
		ctx.beginPath();
		ctx.moveTo(w/2+50, h/2-40);
		ctx.arc(w/2+(40+xMovement), h/2-(40-yMovement), 10, 0, Math.PI * 2, true);
		ctx.fillStyle ="black";
		ctx.fill();
	}
  
  //Setting second eye
	const eye2 = (ctx) => {
		let [w, h] = [canvasRef.current.width, canvasRef.current.height];
		let angle = (mousePos? Math.atan2(mousePos.y-(h/2-40), mousePos.x-(w/2-30)) : null);

		let xMovement = (angle != null ? (Math.cos(angle)*5) : 0);
		let yMovement = (angle != null ? (Math.sin(angle)*5) : 0);
		
		ctx.beginPath();
		ctx.moveTo(w/2-10, h/2-40);
		ctx.arc(w/2-(30-xMovement), h/2-(40-yMovement), 10, 0, Math.PI * 2, true);
		ctx.fillStyle ="black";
		ctx.fill();
	}

	useEffect(() => {
		let ctx = canvasRef.current.getContext('2d');
		let [w, h] = [canvasRef.current.width, canvasRef.current.height];
		ctx.drawImage(imageEl.current, 170, 360);

		ctx.save();
		eye1(ctx);
		ctx.restore();

		ctx.save();
		eye2(ctx);
		ctx.restore();
	})
		
	return (
		<Box border={1} padding={5} width="50%" height="100%">
			<Typography className="heading" variant="h6">Mouse position on canvas 
				{mousePos?
					(" ("+mousePos.x +","+mousePos.y+") "):
					" "}  
			</Typography>
			<img src={Picture} ref={imageEl} style={{"display": "none"}}/>
		<canvas width="700" height="1000" ref={canvasRef} onMouseMove={setMouseCoordinates}/>
		
		</Box>
		
	);
}

export default App;
