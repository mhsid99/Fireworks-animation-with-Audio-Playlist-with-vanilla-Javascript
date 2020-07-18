const rockets=[];
const particles=[];
const colors=['#FF5252','#FF4081','#E040FB','#7C4DFF','#536DFE','#448AFF','#40C4FF','#18FFFF','#64FFDA','#69F0AE','#B2FF59','#EEFF41','#FFFF00','#FFD740','#FFAB40','#FF6E40'];
const songs=
[
    "Lalala.mp3",
    "Stressed Out.mp3",
    "Darkside.mp3",
    "Centuries.mp3",
    "Eminem - Stan Ft Dido.mp3",
    "Everything I Need.mp3",
    "Girls Like You.mp3",
    "Psycho.mp3",
    "Never Forget You.mp3",
    "Eminem-Beautiful.mp3"
];

class Particle
{
    constructor(x,y,index)
    {
        
        this.x=x;
        this.y=y;
        this.color_index=index;

        this.angle=Math.random()*2*Math.PI;
        this.speed=Math.random()*1+0.1;
        
        this.lifeSpan=2500;
        
        this.velocity_x=Math.cos(this.angle)*this.speed;
        this.velocity_y= -Math.sin(this.angle)*this.speed;

        this.el_firework=document.createElement('div');
        this.el_firework.className='particle';

        this.el_firework.style.left=this.x+'px';
        this.el_firework.style.top=this.y+'px';

        this.el_firework.style.backgroundColor=colors[this.color_index];

        document.body.appendChild(this.el_firework);

        setTimeout(()=>
        {
            this.el_firework.remove();
            particles.splice(particles.indexOf(this),1);
        },this.lifeSpan);
    }

    update() 
    {
        this.x+=this.velocity_x;
        this.y+=this.velocity_y;

        this.el_firework.style.left=this.x +'px';
        this.el_firework.style.top=this.y+'px';
    }

}

class Rocket
{
    constructor()
    {
        this.x=window.innerWidth/2;
        this.y=window.innerHeight;

        this.index=Math.floor(Math.random()*colors.length);

        this.height=15;
        this.width=15;

        this.number_of_particles=Math.random()*(80)+20;

        this.angle=(Math.random()*Math.PI/2)+Math.PI/4;
        this.speed=Math.random()*5+16;

        this.velocity_x=Math.cos(this.angle)*this.speed;
        this.velocity_y= -Math.sin(this.angle)*this.speed;

        this.el_firework=document.createElement('div');
        this.el_firework.className='rocket';

        this.lifeSpan=1000;

        this.el_firework.style.left=this.x+'px';
        this.el_firework.style.top=this.y+'px';

        this.el_firework.style.height=this.height+'px';
        this.el_firework.style.width=this.width+'px';

        document.body.appendChild(this.el_firework);

        setTimeout(()=>
        {
            this.explode();
            this.el_firework.remove();
            rockets.splice(rockets.indexOf(this),1);
        },this.lifeSpan);
    }
    explode()
    {
        for(let i=0;i<this.number_of_particles;i++)
        {
            const particle=new Particle(this.x,this.y,this.index);
            particles.push(particle);
        }
    }

    update()
    {
        this.x+=this.velocity_x;
        this.y+=this.velocity_y;
        this.velocity_y+=0.3;

        this.height-=0.25;
        this.width-=0.25;

        this.el_firework.style.left=this.x+'px';
        this.el_firework.style.top=this.y+'px';

        this.el_firework.style.height=this.height+'px';
        this.el_firework.style.width=this.width+'px';
    }
}


setInterval(()=>
{
    const rocket=new Rocket();
    rockets.push(rocket);
},300);

setInterval(() => 
{
    rockets.forEach(rocket => 
    {
        rocket.update();
    });
    particles.forEach(particle => 
    {
      particle.update();
    });
},10);

const create_playlist=()=>
{
    const list=document.createElement('ol');
    for(let i=0;i<songs.length;i++)
    {
        const item=document.createElement('li');
        item.appendChild(document.createTextNode(songs[i]));
        list.appendChild(item);
    }
    return list;
}

document.getElementById('song_list').appendChild(create_playlist());

song_list.onclick=(e)=>
{
    const clicked_item=e.target;
    const source=document.getElementById('source');
    source.src='playlist/'+clicked_item.innerText;
    document.getElementById('curr_song').innerText="Currently Playing: ";
    document.getElementById('current_song').innerText=clicked_item.innerText;

    player.load();
    player.play(); 
}