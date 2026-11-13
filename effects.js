(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const canvas = document.querySelector('#cosmos');
 const ctx = canvas.getContext('2d');
 let stars = [], width, height, frame, visible = true;
 function resize(){width=innerWidth;height=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);stars=Array.from({length:Math.min(100,Math.floor(width/12))},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.1+.2,p:Math.random()*6.28}));draw(0);}
 function draw(time){ctx.clearRect(0,0,width,height);for(const s of stars){ctx.fillStyle=`rgba(255,255,255,${.18+(Math.sin(time*.0004+s.p)+1)*.2})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();}}
 function animate(time){draw(time);if(visible&&!reduced.matches)frame=requestAnimationFrame(animate);}
 function start(){cancelAnimationFrame(frame);if(visible&&!reduced.matches)frame=requestAnimationFrame(animate);else draw(0);}
 addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>{visible=!document.hidden;start();});reduced.addEventListener('change',start);resize();start();
 for(const card of document.querySelectorAll('.tilt')){card.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1100px) rotateX(${-y*9}deg) rotateY(${x*12}deg) translateY(-4px)`;});card.addEventListener('pointerleave',()=>card.style.transform='');}
})();
// Keep the main action available after the visitor scrolls past it.
(() => {
 const main = document.querySelector('#telegram-main');
 const sticky = document.querySelector('.telegram-sticky');
 if (!main || !sticky || !('IntersectionObserver' in window)) return;
 const mobile = matchMedia('(max-width: 700px)');
 let passed = false;
 const update = () => { sticky.hidden = !(mobile.matches && passed); };
 const observer = new IntersectionObserver(([entry]) => {
   passed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
   update();
 }, { threshold: 0 });
 observer.observe(main);
 mobile.addEventListener('change', update);
})();
