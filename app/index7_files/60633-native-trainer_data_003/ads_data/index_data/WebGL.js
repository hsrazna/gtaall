/* -------------------------------------------------------------------------------------
--------------                        WARGAMING.NET                       --------------
----------------------------------------------------------------------------------------
--------------                 © 2016 ALL RIGHTS RESERVED                 --------------
--------------------------------------------------------------------------------------*/

function drawWebGL()
{
	twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
   // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	
	
	//////////////////////////////////////		
		tankImg.scale += (tankImg.sScale-tankImg.scale)/15;
		tankImg.dy = -6.5 - (tankImg.scale-9)/2;
		var s_oScale = tankImg.scale*tankImg.scaleMult;
		var s_oZ = tankImg.dy;
		var s_oY = -80;
		var s_cAng = 11;
		
		
		var s_pAng = cam.pAng*tankImg.angMult;//parseFloat(document.getElementById("s_pAng").value);
	
		
        //mat4.perspective(s_pAng, gl.viewportWidth / gl.viewportHeight, 0.1, 160.0, pMatrix);
		var projection = m4.perspective(s_pAng * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 100);

        var specularHighlights = true;
        var lighting = true;
        var texture = true;
		
	
		if(isDrag == false)
		{
			tankImg.rotation += tankImg.dRot;

			if(tankImg.rotation < -360 && isAutoPlay == false)
			{	
				tankImg.rotation += 360;		
				tankImg.cRotation += 360;
				
				
			}
			
			if(tankImg.rotation > 360)
			{
				tankImg.rotation -= 360;
				tankImg.cRotation -= 360;
			}
		}
		tankImg.cRotation += (tankImg.rotation-tankImg.cRotation)/5;			
		
		time += 0.6;
		
     
		var mvMatrix = m4.identity();
		
		
		for(var i=0; i<myObjects.length; i++)
		{
		var obj = myObjects[i];
		var oUni = obj.uniforms;		
		mvMatrix = m4.identity();	
		
		m4.translate(mvMatrix, [0, s_oZ, s_oY], mvMatrix);
		m4.scale(mvMatrix, [s_oScale, s_oScale, s_oScale], mvMatrix);
       
		m4.rotateX(mvMatrix, radian(s_cAng), mvMatrix);
       
        //mat4.rotate(mvMatrix, degToRad(teapotAngle/2), [0, 1, 0]);
		
		if(!obj.name.match("plate") )
		{
			//console.log(obj)
			 // m4.rotateY(mvMatrix, radian(tankImg.rotation), mvMatrix);
			  m4.rotateY(mvMatrix, radian(-tankImg.cRotation), mvMatrix);
		}
		if(obj.name=="Cylinder")
		{
			m4.rotateY(mvMatrix, radian(-tankImg.cRotation), mvMatrix);
		}
		
		if(obj.name=="Bush" || obj.name=="Bag")
		{
			//console.log(obj)
			 m4.rotateY(mvMatrix, radian(tankImg.bAng), mvMatrix);
			  //m4.rotateY(mvMatrix,Math.sin(tankImg.rotation/30)*2, mvMatrix);
		}
		
		m4.multiply(mvMatrix, obj.matrix, mvMatrix);		
		
		
     
		mat3.normalFromMat4(oUni.uNMatrix, mvMatrix)
		
		
		oUni.uPMatrix = projection;
		oUni.uMVMatrix = mvMatrix;			
		oUni.uShowSpecularHighlights = specularHighlights;
		oUni.uUseLighting = lighting;
		oUni.uAmbientColor = [0.7, 0.7, 0.7];
		oUni.uPointLightingLocation = [-80, 70, 60];
		
		if(obj.name == "floor")
		{
			oUni.uPointLightingLocation = [-10, 40, -240];
		}
			oUni.uUseTextures = true;	
		}
		
	twgl.drawObjectList(gl, myObjects);
}

function initScene()
{	
	for(var i=0; i<tankJSON.object.children.length;i++)
		{
			var obj = {};			
			obj.name = tankJSON.object.children[i].name;			
			obj.matrix = tankJSON.object.children[i].matrix;
			obj.geometry = tankJSON.object.children[i].geometry;
			for(var g = 0; g < tankJSON.geometries.length; g++)
			{	
				if(obj.geometry == tankJSON.geometries[g].uuid)
				{	
					var arr = {};
					arr.aVertexPosition = tankJSON.geometries[g].data.attributes.position.array;					
					arr.aTextureCoord = tankJSON.geometries[g].data.attributes.uv.array;					
					arr.aVertexNormal = tankJSON.geometries[g].data.attributes.normal.array;								
					arr.indices = tankJSON.geometries[g].data.index.array;
					obj.bufferInfo = twgl.createBufferInfoFromArrays(gl, arr);
					obj.programInfo = onePointProgramInfo;
					
					obj.uniforms = 
					{
						uPointLightingDiffuseColor: [1, 1, 1],
						uMaterialShininess: 20,							
						uPointLightingSpecularColor: [0.6, 0.6, 0.6],
						uNMatrix: mat3.create(),
						uSampler:  textures.tankDiffuse,
						uUseBump: false,
						uShowSpecularHighlights: true
					};
					
					if (obj.name == "Bag")
					{
						obj.uniforms.uMaterialShininess =2;							
						obj.uniforms.uPointLightingSpecularColor = [0.1, 0.1, 0.1];						
					}
					
					if (obj.name == "Track" || obj.name == "Track.001")
					{
						obj.uniforms.uSampler = textures.trackDiffuse;
					}	
					if (obj.name == "floor")
					{
						//obj.programInfo = reflectProgramInfo;
						obj.uniforms = 
						{
							uMaterialShininess: 20,							
							uPointLightingSpecularColor: [0.4, 0.4, 0.4],
							uNMatrix: mat3.create(),							
							uUseBump: false,
							uShowSpecularHighlights: true
						}	
						obj.uniforms.uSampler = textures.plateDiffuse;
						obj.uniforms.uMaterialShininess = 76;							
						obj.uniforms.uPointLightingSpecularColor = [3.2, 3.2, 3.2];
						obj.uniforms.uUseBump = true;
						obj.uniforms.bumpMap = textures.plateBump;						
						//obj.uniforms.bumpScale = 2;
						
					//console.log(obj.uniforms)
					}	
					
					
					if(obj.name.match("whell"))
					{
					
						m4.rotateX(obj.matrix, radian(-50), obj.matrix);
					}
					if(obj.name.match("plate"))
					{
						//console.log(obj)
						 // m4.rotateY(mvMatrix, radian(tankImg.rotation), mvMatrix);
						obj.uniforms.uSampler = textures.floorDiffuse;
						m4.rotateY(obj.matrix, radian(90), obj.matrix);
						obj.uniforms.uMaterialShininess = 6;			
						obj.uniforms.uPointLightingDiffuseColor = [0.5, 0.5, 0.5];
						obj.uniforms.uPointLightingSpecularColor = [0.4, 0.4, 0.4];
					}
					
					switch (obj.name)
					{
						case "plate_1":
							//obj.uniforms.uUseBump = true;
						break
						case "plate_2":
							obj.uniforms.uSampler = textures.dashDiffuse;
						break;
						case "plate_3":
							obj.uniforms.uSampler = textures.dashDiffuse;
							m4.rotateY(obj.matrix, radian(90), obj.matrix);
						break;
						case "plate_4":
							obj.uniforms.uSampler = textures.dashDiffuse;
						break;
					}
					
					myObjects.push(obj);					
				}
			}			
		}	

}

function drawFloorShadow()
{
	var nCanvas =  document.createElement("CANVAS");
	nCanvas.width = 512;
	nCanvas.height = 512;
	var ctx = nCanvas.getContext('2d');	
	
	ctx.fillStyle = "#000000"
	ctx.shadowColor = "black";
	ctx.shadowBlur = 10;
	drawRect();
	ctx.shadowOffsetY = 10;
	ctx.shadowBlur = 30;
	drawRect();
	ctx.shadowOffsetY = -20;
	ctx.shadowBlur = 50;
	drawRect();
	tankImg.floorShadow = nCanvas;
	
	nCanvas =  document.createElement("CANVAS");
	nCanvas.width = 512;
	nCanvas.height = 512;
	var ctx = nCanvas.getContext('2d');	
	ctx.fillStyle = "#888888";
	ctx.fillRect(0, 0, 512, 512);
	
	ctx.globalAlpha = 0.6;
	ctx.drawImage(tankImg.floorShadow, 0, 0);	

	tankImg.plateDiffuse = nCanvas;
	
	var nCanvas =  document.createElement("CANVAS");
	nCanvas.width = 512;
	nCanvas.height = 512;
	var ctx = nCanvas.getContext('2d');
	ctx.scale(1.2, 1.2)
	for(var x = 0; x < 8; x++)
	{
		for(var y = 0; y < 8; y++)
		{
			ctx.drawImage(tankImg.plateMap, x*64, y*64);
		}
	}
	ctx.globalAlpha = 0.5;
	ctx.scale(1/1.2, 1/1.2)
	ctx.drawImage(tankImg.floorShadow, 0, 0);
	tankImg.plateBump = nCanvas;
	
	function drawRect(){ctx.fillRect(148, 100, 210, 310);}
	//canvasInteractive.getContext('2d').drawImage(nCanvas, 0, 0);
}



function initTextures()
{
 gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	textures = twgl.createTextures(gl, 
	{	
		tankDiffuse:  { src: "images/diffuse_map_2.jpg", crossOrigin:"Anonymous", mag: gl.LINEAR,  min: gl.LINEAR_MIPMAP_LINEAR},
		trackDiffuse: { src: "images/track.jpg", crossOrigin:"Anonymous", mag: gl.LINEAR,  min: gl.LINEAR_MIPMAP_LINEAR},
		plateDiffuse: { src: tankImg.plateDiffuse, mag: gl.LINEAR,  min: gl.LINEAR_MIPMAP_LINEAR},
		plateBump: { src: tankImg.plateBump,   mag: gl.LINEAR,  min: gl.LINEAR_MIPMAP_LINEAR},
		floorDiffuse: { src: "images/floorDiffuse.jpg", crossOrigin:"Anonymous", mag: gl.LINEAR,  min: gl.LINEAR_MIPMAP_LINEAR},
		dashDiffuse: { src: tankImg.dashCanvas, mag: gl.LINEAR,  min: gl.NEAREST_MIPMAP_LINEAR}		
		//NEAREST
	}); 
} 