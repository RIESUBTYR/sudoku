var sq={
    Across:null,
    Down:null,
    Region:null,
    Value:null,
    Index:null
};

function randomInt(min,max)
{
    return min+ Math.floor((max+1-min) *  Math.random());
}

function getAcross(n)
{
    var k= n%9;
    if(k==0)
    return 9;
    else
    return k;
}

function getDown(n)
{
    var k;

    if(getAcross(n)==9)
        k=n/9;
    else
        k=n/9+1;
    
    return k;
}

function getRegion(n)
{
    var k;
    var a=getAcross(n);
    var d=getDown(n);

    if(1<=a && a<4 && 1<=d && d<4)
        k=1;
    else if(4<=a && a<7 && 1<=d && d<4)
        k=2;
    else if(7<=a && a<10 && 1<=d && d<4)
        k=3;
    else if(1<=a && a<4 &&  4<=d && d<7)
        k=4;
    else if(4<=a && a<7 && 4<=d && d<7)
        k=5;
    else if(7<=a && a<10 && 4<=d && d<7)
        k=6;
    else if(1<=a && a<4 &&  7<=d && d<10)
        k=7;
    else if(4<=a && a<7 && 7<=d && d<10)
        k=8;
    else if(7<=a && a<10 && 7<=d && d<10)
        k=9;
    
    return k;

}

function Item(n,v)
{
    var item=sq;
    n += 1;
    item.Across = getAcross(n);
    item.Down = getDown(n);
    item.Region = getRegion(n);
    item.Value = v;
    item.Index = n - 1;
    return item;
}

function Conflicts(currentValues , test)
{
   // console.log(test);
    for(s in currentValues)
    {
        if( (s.Across!=0 && s.Across==test.Across) ||  (s.Down!=0 && s.Down==test.Down) ||  (s.Region!=0 && s.Region==test.Region))
        {
            if(s.Value==test.Value)
                return true;
        }
    }

    return false;
}


function generate()
{
   
    var square=new Array(81);

    var Available=new Array(81);
    for(var i=0;i<81;i++)
    {
        square[i]=sq;

        Available[i]=new Array(9);
        for(var j=0;j<9;j++)
            Available[i][j]=j+1;
    }

    var c=0;

    while(c!=81)
    {
        
         if(Available[c].length!=0)
        {
             var i=randomInt(0,Available[c].length);
             //console.log(i);
             var z=Available[c][i];
             if(Conflicts(square,Item(c,z))==false)
             {
                 square[c]=Item(c,z);
                 Available[c].splice(i,1);
                 c+=1;
             }    
             else
                Available[c].splice(i,1);
        }
        else
        {
            for(var y=1;y<=9;y++)
            {
                Available[c].push(y);
            }
            square[c-1]=null;
            c-=1;
        }
    }

    console.log(square);
    var grid=new Array(9);
/*
    for(var i=0;i<9;i++)
    {
        grid[i]=new Array(9);
        for(var j=0;j<9;j++)
        {
            grid[i][j]=new Array(2);
            grid[i][j][0] = randomInt(1,10);
            grid[i][j][1] = randomInt(0,2);
        }
    }
    window.alert(grid);
*/

}




generate();