import { Injectable } from '@angular/core';

export interface BurgerItem {
  id: number;
  image: string;
  name: string;
  price: number;
  stars: number;
  favorite: boolean;
  category: 'Combos' | 'Sliders' | 'Clássicos';
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private items: BurgerItem[] = [
    {
      id: 1,
      image: 'image1.jpg',
      name: 'Combo Clássico',
      price: 29.99,
      stars: 4.5,
      favorite: false,
      category: 'Combos',
      description: 'Um combo clássico com hambúrguer, batatas fritas e refrigerante.'
    },
    {
      id: 2,
      image: 'image2.jpg',
      name: 'Combo Duplo Bacon',
      price: 34.99,
      stars: 4.8,
      favorite: false,
      category: 'Combos',
      description: 'Um delicioso combo com hambúrguer duplo e bacon crocante.'
    },
    {
      id: 3,
      image: 'image3.jpg',
      name: 'Combo Vegetariano',
      price: 27.99,
      stars: 4.7,
      favorite: false,
      category: 'Combos',
      description: 'Um combo saudável com hambúrguer vegetariano e batatas fritas.'
    },
    {
      id: 4,
      image: 'image4.jpg',
      name: 'Slider Tradicional',
      price: 9.99,
      stars: 4.2,
      favorite: false,
      category: 'Sliders',
      description: 'Um pequeno e saboroso hambúrguer tradicional.'
    },
    {
      id: 5,
      image: 'image5.jpg',
      name: 'Slider Cheddar',
      price: 10.99,
      stars: 4.6,
      favorite: false,
      category: 'Sliders',
      description: 'Um slider delicioso com cheddar derretido.'
    },
    {
      id: 6,
      image: 'image6.jpg',
      name: 'Slider Barbecue',
      price: 11.99,
      stars: 4.5,
      favorite: false,
      category: 'Sliders',
      description: 'Um slider com molho barbecue caseiro.'
    },
    {
      id: 7,
      image: 'image7.jpg',
      name: 'Hambúrguer Clássico',
      price: 19.99,
      stars: 4.5,
      favorite: false,
      category: 'Clássicos',
      description: 'O clássico hambúrguer com carne suculenta e pão fresquinho.'
    },
    {
      id: 8,
      image: 'image8.jpg',
      name: 'Cheeseburger',
      price: 24.99,
      stars: 4.8,
      favorite: false,
      category: 'Clássicos',
      description: 'Um cheeseburger irresistível com queijo derretido.'
    },
    {
      id: 9,
      image: 'image9.jpg',
      name: 'Hambúrguer de Frango',
      price: 21.99,
      stars: 4.7,
      favorite: false,
      category: 'Clássicos',
      description: 'Hambúrguer de frango empanado e crocante.'
    },
    {
      id: 10,
      image: 'image10.jpg',
      name: 'Hambúrguer Vegano',
      price: 22.99,
      stars: 4.4,
      favorite: false,
      category: 'Clássicos',
      description: 'Uma opção vegana deliciosa e saudável.'
    },
    {
      id: 11,
      image: 'image11.jpg',
      name: 'Hambúrguer Duplo',
      price: 26.99,
      stars: 4.9,
      favorite: false,
      category: 'Clássicos',
      description: 'Dois hambúrgueres suculentos em um só lanche.'
    },
    {
      id: 12,
      image: 'image12.jpg',
      name: 'Combo Bacon e Queijo',
      price: 32.99,
      stars: 4.8,
      favorite: false,
      category: 'Combos',
      description: 'Um combo com bacon crocante e queijo derretido.'
    },
    {
      id: 13,
      image: 'image13.jpg',
      name: 'Slider de Frango',
      price: 10.49,
      stars: 4.5,
      favorite: false,
      category: 'Sliders',
      description: 'Um pequeno hambúrguer de frango delicioso.'
    },
    {
      id: 14,
      image: 'image14.jpg',
      name: 'Combo Especial da Casa',
      price: 35.99,
      stars: 4.9,
      favorite: false,
      category: 'Combos',
      description: 'O combo especial da casa com ingredientes selecionados.'
    },
    {
      id: 15,
      image: 'image15.jpg',
      name: 'Slider Vegetariano',
      price: 9.49,
      stars: 4.3,
      favorite: false,
      category: 'Sliders',
      description: 'Um slider vegetariano cheio de sabor.'
    },
  ];

  getItems(): BurgerItem[] {
    return this.items;
  }

  getItemById(id: number): BurgerItem | undefined {
    return this.items.find(item => item.id === id);
  }
}
