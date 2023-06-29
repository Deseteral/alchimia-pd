import { Input } from './engine/input';

(function main() {
  console.log('init');
}());

playdate.update = () => {
  console.log(Input.getKey('a'));
};
