let intervalID

set_list.onclick = async () => {
  set_list.disabled = true //連続クリックの防止、ボタン非活性化
  const form = document.getElementById("name")
  const name = document.getElementById("name").value
  if (name.length == 0){ //空の文字列を拒否
    alert("何も入力されていません")
    set_list.disabled = false //連続クリックの防止、ボタン活性化
    return false
  }
  const response = await fetch("/api/setList?x=" + name,{
    method: "GET"
  })
  form.value = ""; //追加ごとに入力フォームを初期化
  set_list.disabled = false //連続クリックの防止、ボタン活性化
}

function addTable(name,done){
  let table = document.getElementById("stay_home_list")
  let newRow = table.insertRow()
  let newCell = newRow.insertCell()
  let newText = document.createTextNode("チェックリスト")
  newCell.appendChild(newText)

  newCell = newRow.insertCell()
  newText = document.createTextNode(name)
  newCell.appendChild(newText)
}

async function addlistData(){//リストにデータを表示
  const response = await fetch("/api/getToDoList",{
    method: "GET"
  })
  const json = await response.json()
  const list = json.list
  console.log(list)
  let table = document.getElementById("stay_home_list")
  table.deleteTHead()
  let thead = table.createTHead();
  let newRow = thead.insertRow();

  let newCell = newRow.insertCell()
  let newText = document.createTextNode("やったかチェック")
  newCell.appendChild(newText)

  newCell = newRow.insertCell()
  newText = document.createTextNode("やることの内容")
  newCell.appendChild(newText)
  for(let i = 0;i < list.length;i++){
    addTable(list[i].inside,list[i].done)
    console.log(list[i].inside)
  }
  
}

window.onload = await function() {
  intervalID = setInterval(addlistData,1000)
}