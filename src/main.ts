import { Input } from 'src/engine/input';

(function main() {
  console.log('init');
}());

playdate.update = () => {
  console.log(Input.getKey('a'));
};
