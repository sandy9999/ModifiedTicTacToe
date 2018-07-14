var me = true;

function startgame()
{
	board = [
	[-1,-1,-1],[-1,-1,-1],[-1,-1,-1] ];
	me = true;
	update()
}


function winner(board)
{
	var allfill = true;
	for(var i=0; i<2; i++)
	{
		var trdiag = true;
		var tldiag = true;
		for(var j=0; j<3; j++)
		{
			if(board[j][j]!=i)
				tldiag = false;
			if(board[2-j][j]!=i)
				trdiag = false;
			var row = true;
			var col = true;
			for(var k=0; k<3; k++)
			{
				if(board[j][k]!=i)
					row = false;
				if(board[k][j]!=i)
					col = false;
				if(board[j][k]==-1)
					allfill = false;
			}
			if(row || col)
				return i;

		}
		if(trdiag || tldiag)
			return i;//Note 0 means me
	}
	if(allfill)
		return -1;//Tie
	return  -1000

}

function updateUI()
{
	for(var i=0; i<3; i++)
	{
		for(var j=0; j<3; j++)
		{
			if(board[i][j]==1)
				document.getElementById('_'+i.toString()+j.toString()).innerHTML = 'X';
			else if(board[i][j]==0)
				document.getElementById('_'+i.toString()+j.toString()).innerHTML = 'O';
			else
				document.getElementById('_'+i.toString()+j.toString()).innerHTML = '';
		}
	}

}


function update()
{
	updateUI();
	var val = winner(board)
	if(val==1)
		alert("AI won!");
	else if(val==0)
		alert("You won!");
	else if(val==-1)
		alert("Tie!");

}

function buttonclick(id)
{
	var r = parseInt(id[1]);
	var c = parseInt(id[2]);
	if(me)
	{
		board[r][c] = 0;
		me = false;
		update();
		AImove();
	}

}

function minimax(board,who)
{
	var win = winner(board);
	if(win==1)
		return 1;
	else if(win==0)
		return -1;
	else if(win==-1)
		return 0;
	if(who)
	{
		var best = -1000;
		for(var i=0; i<3; i++)
		{
			for(var j=0; j<3; j++)
			{
				if(board[i][j]==-1)
				{
					board[i][j] = 1;
					best = Math.max(best,minimax(board,!who));
					board[i][j] = -1;
				}
			}
		}
		return best;
	}
	else
	{
		var best = 1000;
		for(var i=0; i<3; i++)
		{
			for(var j=0; j<3; j++)
			{
				if(board[i][j]==-1)
				{
					board[i][j] = 0;
					best = Math.min(best,minimax(board,!who));
					board[i][j] = -1;
				}
			}
		}
		return best;

	}
}

function AImove()
{
	var bestie = -1000;
	var bestrow = -1;
	var bestcol = -1;
	for(var i=0; i<3; i++)
	{
		for(var j=0; j<3; j++)
		{
			if(board[i][j]==-1)
			{
				board[i][j] = 1;
				var movie = minimax(board,0);
				board[i][j] = -1;
				if(movie>bestie)
				{
					bestrow = i;
					bestcol = j;
					bestie = movie;
				}
			}
		}
	}
	board[bestrow][bestcol] = 1;
	me = true;
	update();
}


