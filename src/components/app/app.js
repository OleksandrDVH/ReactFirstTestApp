import { Component } from 'react';

import AppInfo from '../app-info/AppInfo';
import SearchPanel  from '../search-panel/SearchPanel';
import '../app-filter/AppFilter'
import EmployersList from '../employers-list/EmployersList';
import EmployersAddForm from '../employers-add-form/EmployersAddForm';

import './app.css';
import AppFilter from '../app-filter/AppFilter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       data: [
        {name: 'Sasha D.', salary: 800, increase : false, rise: true, id: 1},
        {name: 'Margarita D.', salary: 3000, increase : true, rise: false, id: 2},
        {name: 'Artem R.', salary: 5000, increase : false, rise: false, id: 3},
      ]
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
}

onToggleIncrease = (id) => {
  // this.setState(({data}) => {
  //   const index = data.findIndex(elem => elem.id === id);

  //   const old = data[index];
  //   const newItem = {...old, increase: !old.increase};
  //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index +1)];

  //   return {
  //     data: newArr
  //   }
  // })

  this.setState(({data}) => ({
    data: data.map(item => {
      if (item.id === id) {
        return {...item, increase: !item.increase}
      }
      return item;
    })
  }))
}

onToggleRise = (id) => {
  this.setState(({data}) => ({
    data: data.map(item => {
      if (item.id === id) {
        return {...item, rise: !item.rise}
      }
      return item;
    })
  }));
}

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased}/>
  
        <div className="search-panel">
          <SearchPanel/>
          <AppFilter/>
        </div>
  
        <EmployersList 
        data={this.state.data}
        onDelete={this.deleteItem}
        onToggleIncrease={this.onToggleIncrease}
        onToggleRise={this.onToggleRise}/>
        <EmployersAddForm onAdd={this.addItem}/>
      </div>
    )
  }
}

export default App;