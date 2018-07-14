var me = true;

function youstart()
{
	board = [
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1] ];
	me = true;
	update()
}

function AIstart()
{
	board = [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1] ];
	me = false;
	update();
	AImove();
}

function winner(board)
{
	var allfill = true;
	for(var i=0; i<2; i++)
	{
		var trdiag = false;
		var tldiag = false;
		var cttrdiag=0;
		var cttldiag=0;
		for(var j=0; j<9; j++)
		{
			if(board[j][j]==i)
				cttldiag++;
			else
				cttldiag=0;
			if(board[8-j][j]==i)
				cttrdiag++;
			else
				cttrdiag=0;
			if(cttrdiag==5)
				trdiag = true;
			if(cttldiag==5)
				tldiag=true;
			var row = false;
			var col = false;
			var rowct=0;
			var colct=0;
			for(var k=0; k<9; k++)
			{
				if(board[j][k]==i)
					rowct++;
				else
					rowct=0;
				if(board[k][j]==i)
					colct++;
				else
					colct=0;
				if(rowct==5)
					row = true;
				if(colct==5)
					col = true;
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
	for(var i=0; i<9; i++)
	{
		for(var j=0; j<9; j++)
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
	if(me && board[r][c]==-1)
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
		for(var i=0; i<9; i++)
		{
			for(var j=0; j<9; j++)
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
		for(var i=0; i<9; i++)
		{
			for(var j=0; j<9; j++)
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
	for(var i=0; i<9; i++)
	{
		for(var j=0; j<9; j++)
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


