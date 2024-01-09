var socket = io('http://localhost:5000');

document.querySelector('#imagePathForm').addEventListener('submit', function(event) {
 event.preventDefault();
 var imagePath = document.querySelector('#image_path').value;

 fetch('http://localhost:5000/process_image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({image_path: imagePath})
 })
 .then(response => response.json())
 .then(data => {
  console.log(data);
  socket.emit('similiar', data);
 })
 .catch((error) => {
  console.error('Error:', error);
 });

 socket.on('similiar', function(hit){
  console.log(hit);
 });
});