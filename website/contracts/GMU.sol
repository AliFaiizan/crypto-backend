pragma solidity >=0.7.0 <0.9.0;

//code for the trc20 token

abstract contract ERC20_STD{

    function name() public view virtual returns (string)
    function symbol() public view virtual returns (string)
    function decimals() public view  virtual returns (uint8)
    function totalSupply() public view  virtual returns (uint256)
    function balanceOf(address _owner) public virtual view returns (uint256 balance)
    function transfer(address _to, uint256 _value) public virtual returns (bool success)
    function transferFrom(address _from, address _to, uint256 _value) public virtual returns (bool success)
    function approve(address _spender, uint256 _value) public virtual returns (bool success)
    function allowance(address _owner, address _spender) public view virtual returns (uint256 remaining)

    event Transfer(address indexed _from, address indexed _to, uint256 _value)
    event Approval(address indexed _owner, address indexed _spender, uint256 _value)
}


contract Ownership{
    address public contractOwner;
    address public newOwner;

    event TransferOwnership(address indexed _from,address indexed _to)

    constructor(){
        contractOwner=msg.sender;

    }

    function changeOwner(address _to) public{
        require(msg.sender==contractOwner,"Only owner of the contract can execute it")
        newOwner=_to;

    }
    
    function acceptOwner(){
        require(msg.sender== newOwner,"Only new assigned owner can call it");
        emit TransferOwnership(contractOnwer,newOwner);
        contractOwner=newOwner;
        newOwner=address(0);
    }
}

contract MyERC20 is ERC20_STD,Ownership{

    string public _name;
    string public _symbol;
    string public _decimals;
    uint256 public _totalSupply;
    address public _minter;

    mapping(address => uint256) tokenBalances;
    mapping(address => mapping(address=>uint256)) allowed;
    
    constructor(address minter_){
        _name="GrandMeta";
        _symbol="GMU";
        _totalSupply=10000000;
        _minter= minter_

        tokenBalances[_minter] = _totalSupply;
    }


    function name() public view override returns (string){
        return _name;
    }
    function symbol() public view override returns (string){
        return _symbol;
    }
    function decimals() public view override returns (uint8){
        return _decimals;
    }
    function totalSupply() public view override returns (uint256){
        return _totalSupply;
    }
    function balanceOf(address _owner) public override view returns (uint256 balance){
        return tokenBalances[_owner];
    }
    function transfer(address _to, uint256 _value) public override returns (bool success){
        require (tokenBalances[msg.sender] >= _value,"Insufficient Balance");
        tokenBalances[msg.sender] -= _value;
        tokenBalances[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
    }
    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success){
        uint256 allowedBal=allowed[_from][msg.sender];
        require( allowedBal >= _value,"Insufficient Balance")
        tokenBalances[_from]-= _value;
        tokenBalances[_to] += _value;
    }
    function approve(address _spender, uint256 _value) public override returns (bool success){
        require(tokenBalances[msg.sender]>=value,"Insufficient tokens");
        allowed[msg.sender][_spender]=_value;
        emit Approval(msg.sender,_spender,_value)
        return true;
    }
    function allowance(address _owner, address _spender) public view virtual returns (uint256 remaining){
        return allowed[_owner][_spender];
    }


}