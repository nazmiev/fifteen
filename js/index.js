const containerNode=document.getElementById("fifteen"),itemNodes=Array.from(containerNode.querySelectorAll(".item")),countItems=16;if(16!==itemNodes.length)throw new Error(`Должно быть ровно ${countItems} items in HTML`);itemNodes[countItems-1].style.display="none";let matrix=getMatrix(itemNodes.map(t=>Number(t.dataset.matrixId)));setPositionItems(matrix),document.getElementById("shuffle").addEventListener("click",()=>{var t=shuffleArray(matrix.flat());matrix=getMatrix(t),setPositionItems(matrix)});const blankNumber=16;function getMatrix(e){const r=[[],[],[],[]];let n=0,o=0;for(let t=0;t<e.length;t++)4<=n&&(o++,n=0),r[o][n]=e[t],n++;return r}function setPositionItems(r){for(let e=0;e<r.length;e++)for(let t=0;t<r[e].length;t++){var n=r[e][t];setNodeStyles(itemNodes[n-1],t,e)}}function setNodeStyles(t,e,r){t.style.transform=`translate3D(${100*e}%, ${100*r}%, 0)`}function shuffleArray(t){return t.map(t=>({value:t,sort:Math.random()})).sort((t,e)=>t.sort-e.sort).map(({value:t})=>t)}function findCoordinatesByNumber(r,n){for(let e=0;e<n.length;e++)for(let t=0;t<n[e].length;t++)if(n[e][t]===r)return{x:t,y:e};return null}function isValidForSwap(t,e){var r=Math.abs(t.x-e.x),n=Math.abs(t.y-e.y);return!(1!==r&&1!==n||t.x!==e.x&&t.y!==e.y)}function swap(t,e,r){r[e.y][e.x]=[r[t.y][t.x],r[t.y][t.x]=r[e.y][e.x]][0]}containerNode.addEventListener("click",t=>{var e=t.target.closest("button");!e||isValidForSwap(t=findCoordinatesByNumber(Number(e.dataset.matrixId),matrix),e=findCoordinatesByNumber(blankNumber,matrix))&&(swap(e,t,matrix),setPositionItems(matrix))});