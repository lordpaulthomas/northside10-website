"use client"

import { useState } from "react"
import Image from "next/image"
import { DailySpecialsDisplay } from "@/components/daily-specials-display"

type MenuCategory = "brunch" | "dinner" | "desserts" | "kids" | "specials"

export function MenusContent() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("specials")

  return (
    <div className="bg-soft-white">
      {/* Decorative Header Section */}
      <div className="relative bg-charcoal text-soft-white py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Red Logo Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <Image
            src="/images/northside-logo-red.png"
            alt=""
            width={800}
            height={800}
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Center - Title */}
            <div className="text-center flex-1">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2">NORTHSIDE 10</h1>
              <div className="h-1 w-24 bg-brick-red mx-auto my-4"></div>
              <p className="font-sans text-sm md:text-base uppercase tracking-widest">Restaurant Menus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Navigation Buttons */}
      <div className="bg-warm-gray py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            <button
              onClick={() => setActiveTab("brunch")}
              className={`font-serif text-lg md:text-xl px-6 py-4 border-2 rounded transition-all ${
                activeTab === "brunch"
                  ? "bg-crimson-red border-crimson-red text-soft-white"
                  : "bg-transparent border-charcoal text-charcoal hover:border-crimson-red hover:text-crimson-red"
              }`}
            >
              Brunch
            </button>
            <button
              onClick={() => setActiveTab("dinner")}
              className={`font-serif text-lg md:text-xl px-6 py-4 border-2 rounded transition-all ${
                activeTab === "dinner"
                  ? "bg-crimson-red border-crimson-red text-soft-white"
                  : "bg-transparent border-charcoal text-charcoal hover:border-crimson-red hover:text-crimson-red"
              }`}
            >
              Dinner
            </button>
            <button
              onClick={() => setActiveTab("desserts")}
              className={`font-serif text-lg md:text-xl px-6 py-4 border-2 rounded transition-all ${
                activeTab === "desserts"
                  ? "bg-crimson-red border-crimson-red text-soft-white"
                  : "bg-transparent border-charcoal text-charcoal hover:border-crimson-red hover:text-crimson-red"
              }`}
            >
              Desserts
            </button>
            <button
              onClick={() => setActiveTab("kids")}
              className={`font-serif text-lg md:text-xl px-6 py-4 border-2 rounded transition-all ${
                activeTab === "kids"
                  ? "bg-crimson-red border-crimson-red text-soft-white"
                  : "bg-transparent border-charcoal text-charcoal hover:border-crimson-red hover:text-crimson-red"
              }`}
            >
              Kids
            </button>
            <button
              onClick={() => setActiveTab("specials")}
              className={`font-serif text-lg md:text-xl px-6 py-4 border-2 rounded transition-all col-span-2 md:col-span-1 ${
                activeTab === "specials"
                  ? "bg-crimson-red border-crimson-red text-soft-white"
                  : "bg-transparent border-charcoal text-charcoal hover:border-crimson-red hover:text-crimson-red"
              }`}
            >
              Daily Specials
            </button>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {activeTab === "brunch" && <BrunchMenu />}
        {activeTab === "dinner" && <DinnerMenu />}
        {activeTab === "desserts" && <DessertsMenu />}
        {activeTab === "kids" && <KidsMenu />}
        {activeTab === "specials" && <SpecialsMenu />}
      </div>
    </div>
  )
}

// Brunch Menu Component
function BrunchMenu() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-charcoal">Brunch Menu</h1>
        <p className="font-sans text-sm md:text-base text-charcoal/70 uppercase tracking-wider">
          Available Saturday and Sunday from 10:00am to 3:00pm
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Benedicts */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">BENEDICTS</h2>
          <div className="space-y-6">
            <MenuItem
              name="EGGS BENEDICT"
              price="15"
              description="canadian bacon, poached eggs, hollandaise, english muffins, home fries"
            />
            <MenuItem
              name="FRIED GREEN TOMATO BENEDICT"
              price="17"
              description="fried green tomatoes, bacon, spinach, poached eggs, hollandaise, english muffins, home fries"
            />
            <MenuItem
              name="SALMON BENEDICT"
              price="19"
              description="smoked salmon, hollandaise, english muffins, capers, onions, home fries"
            />
            <MenuItem
              name="SOUTHERN BENEDICT"
              price="16"
              description="corn bread, pulled pork, poached eggs, hollandaise, home fries, mixed greens"
            />
            <MenuItem
              name="STEAK BENEDICT"
              price="22"
              description="grilled tenderloin medallions, poached eggs, english muffins, home fries, mixed greens"
            />
            <MenuItem
              name="AVOCADO BENEDICT"
              price="17"
              description="multi grain toast, avocado spread, poached eggs, hollandaise, everything bagel seasoning, home fries"
            />
            <MenuItem name="NORTHSIDE CINNAMON ROLL" price="10" description="our house made cinnamon roll topped" />
          </div>
        </div>

        {/* Entrees */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">ENTREES</h2>
          <div className="space-y-6">
            <MenuItem
              name="SHRIMP AND GRITS"
              price="20"
              description="smoked gouda grits, andouille sausage gravy, sautéed shrimp"
            />
            <MenuItem
              name="STEAK & EGGS"
              price="24"
              description="grilled tenderloin medallions, fried eggs, chorizo and potato hash"
            />
            <MenuItem
              name="FRIED CHICKEN AND WAFFLES"
              price="19"
              description="buttermilk waffle, hand breaded tenders, southern sausage gravy"
            />
            <MenuItem
              name="EGGS ANY STYLE"
              price="15"
              description="two eggs, home fries, choice of toast or english muffin, choice of bacon or sausage"
            />
            <MenuItem
              name="NORTHSIDE SKILLET"
              price="18"
              description="home fries, sausage gravy, cheddar cheese, bacon, sunny side up eggs"
            />
            <MenuItem
              name="BEAR CLAW FRENCH TOAST"
              price="16"
              description="brioche bread, icing, almonds, choice of bacon or sausage"
            />
            <MenuItem name="GRILLED CHEESE" price="15" description="bacon, egg, tomato, avocado, cheese, tots" />
            <MenuItem name="BREAKFAST QUESADILLA" price="16" description="bacon, egg, cheese" />
            <MenuItem
              name="BISCUITS AND GRAVY"
              price="17"
              description="buttermilk biscuits, southern sausage gravy, fried eggs"
            />
          </div>
        </div>
      </div>

      {/* Sides and Cocktails */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 mt-12">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">SIDES</h2>
          <div className="space-y-4">
            <MenuItem name="SMOKED GOUDA GRITS" price="7" />
            <MenuItem name="BOWL OF MIXED FRUIT" price="6" />
            <MenuItem name="HOME FRIES" price="5" />
            <MenuItem name="BACON OR SAUSAGE" price="5" />
            <MenuItem name="CHORIZO HASH" price="6" />
            <MenuItem name="BISCUIT WITH SAUSAGE GRAVY" price="8" />
            <MenuItem name="CORNBREAD 4 PIECES" price="6" />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">BRUNCH COCKTAILS</h2>
          <div className="space-y-4">
            <MenuItem name="DILL PICKLE BLOODY" price="11" />
            <MenuItem name="MIMOSA" price="8" />
            <MenuItem name="PEACH BELLINI" price="9" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Dinner Menu Component
function DinnerMenu() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">Dinner Menu</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Starters */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">STARTERS</h2>
          <div className="space-y-6">
            <MenuItem name="WINGS (GF)" price="15" description="choice of buffalo, bbq, old bay or cajun" />
            <MenuItem
              name="NORTHSIDE NACHOS"
              price="15"
              description="choice of chicken, pork (GF), or chili (GF), mixed cheese, lettuce, pico, and sour cream"
            />
            <MenuItem name="RISOTTO FRITTERS" price="14" description="gruyere and parmesan, tomato gravy" />
            <MenuItem
              name="SHORT RIB POUTINE"
              price="18"
              description="steak fries, braised short rib, marsala gravy and cheese curds"
            />
            <MenuItem name="BRUSSEL SPROUTS (GF)" price="13" description="bacon, asiago cheese" />
            <MenuItem
              name="RED BEAN CHILI (GF)"
              price="13"
              description="add onion, cheese, sour cream, or jalapeños $1 each, $3 for all"
            />
            <MenuItem name="CRAB DIP" price="16" description="pretzel baguettes" />
            <MenuItem name="F.G. T.'s" price="13" description="fried green tomatoes, remoulade" />
            <MenuItem name="CHICKEN STRIPS" price="14" description="house breaded with remoulade" />
          </div>
        </div>

        {/* Salads */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">SALADS</h2>
          <div className="space-y-6">
            <MenuItem
              name="HOUSE GREEN SALAD"
              price="11"
              description="house greens, garlic croutons, tomatoes, cucumber, cheddar cheese"
            />
            <MenuItem name="CAESAR SALAD" price="10" description="house greens, garlic croutons, parmesan cheese" />
            <MenuItem
              name="SPINACH SALAD"
              price="12"
              description="bacon, whipped feta, red onion, balsamic vinaigrette"
            />
            <MenuItem
              name="CHOPPED COBB SALAD"
              price="17"
              description="house greens, fried chicken, bacon, egg, avocado, tomato, crumbled bleu cheese, honey mustard vinaigrette"
            />
            <MenuItem
              name="SAVANNAH STEAK SALAD"
              price="20"
              description="house greens, roasted red pepper, crumbled bleu cheese, onion strings, bbq ranch"
            />
            <MenuItem
              name="PULLED CHICKEN SALAD"
              price="16"
              description="house greens, jalapeño honey pulled chicken, black beans, mixed cheese, pico de gallo, bbq ranch"
            />
            <MenuItem
              name="BLACKENED FISH SALAD"
              price="21"
              description="spring mix, strawberries, pecans, feta, bacon, balsamic vinaigrette"
            />
            <p className="text-sm italic text-charcoal/70 mt-4">add steak 9/ chicken 7/ salmon 8/ shrimp 9</p>
          </div>
        </div>
      </div>

      {/* Sandwiches */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">SANDWICHES</h2>
        <p className="text-sm text-charcoal/70 mb-6 uppercase tracking-wider">All sandwiches served with fries</p>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          <MenuItem
            name="NS10 BURGER"
            price="15"
            description="8 oz CAB, lettuce, onion, tomato, pickle, brioche roll. add cheddar, American, Swiss, pepper jack, bleu, or gruyere 2. add bacon, chili, VA ham, house-made pastrami, mushrooms, avocado, fried egg, grilled onion 2"
          />
          <MenuItem
            name="SPICY FRIED CHICKEN"
            price="16"
            description="spicy breading, pepper jack cheese, jalapeño aioli"
          />
          <MenuItem
            name="NEW ORLEANS 'PO BOYS'"
            price="18"
            description="choice of shrimp, oyster, catfish or combination with remoulade, lettuce, tomato"
          />
          <MenuItem
            name="GRILLED CHICKEN"
            price="16"
            description="bacon, swiss, honey mustard vinaigrette on the side"
          />
          <MenuItem name="CAROLINA PULLED PORK" price="15" description="slaw, house-made pickles" />
          <MenuItem name="'5 DAY' REUBEN" price="19" description="sauerkraut, gruyere, Russian dressing" />
          <MenuItem
            name="SPICY FISH SANDWICH"
            price="19"
            description="spicy breading, fried flounder, american cheese, house-made tartar"
          />
          <MenuItem
            name="VEGGIE CHEESESTEAK"
            price="17"
            description="portobello, onion, roasted red pepper, provolone, balsamic"
          />
          <MenuItem
            name="PULLED CHICKEN"
            price="15"
            description="jalapeño honey pulled chicken, slaw, house-made pickles"
          />
          <MenuItem
            name="SOUTHWEST CHICKEN WRAP"
            price="17"
            description="blackened chicken, house greens, black beans, avocado, tomatoes, mixed cheese, bbq ranch"
          />
          <MenuItem
            name="SMOKEHOUSE QUESADILLA"
            price="17"
            description="grilled chicken, mixed cheese, black bean puree, sautéed onions, bbq sauce, served with lettuce, sour cream and pico"
          />
        </div>
      </div>

      {/* Entrees */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">ENTREES</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          <MenuItem
            name="BACON WRAPPED MEATLOAF"
            price="24"
            description="two pieces of meatloaf, tomato bacon gravy, mashed potatoes, garlic green beans"
          />
          <MenuItem
            name="PARMESAN FLOUNDER"
            price="26"
            description="shrimp pirloo, topped with a crab, tomato, asparagus salad"
          />
          <MenuItem name="BBQ SALMON" price="23" description="maque-choux risotto, onion strings, house-made bbq" />
          <MenuItem
            name="BRAISED SHORT RIBS (GF)"
            price="32"
            description="slow cooked, over asiago and mushroom risotto, garlic green beans"
          />
          <MenuItem
            name="STEAK AND FRIES"
            price="30"
            description="8oz filet medallions, brandy peppercorn sauce, fries, mixed greens, balsamic vinaigrette"
          />
          <MenuItem
            name="PECAN CRUSTED CHICKEN"
            price="24"
            description="Pan seared chicken breast w/ pecans, honey mustard glaze, garlic mashed potatoes, sautéed vegetables"
          />
          <MenuItem
            name="BLACKENED CHICKEN PASTA"
            price="22"
            description="linguini, tomato, mushroom, parmesan cream sauce"
          />
          <MenuItem name="SHRIMP RISOTTO (GF)" price="24" description="asiago, roasted red pepper, spinach" />
          <MenuItem
            name="JAMBALAYA PASTA"
            price="24"
            description="penne, shrimp, andouille sausage, chicken, onions, bell peppers, cajun cream sauce"
          />
          <MenuItem
            name="RIBEYE (GF)"
            price="36"
            description="14oz ribeye, garlic mashed potatoes, chimichurri butter, grilled asparagus"
          />
        </div>
      </div>

      {/* Sides */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">SIDES</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          <MenuItem name="FRIES" price="8" />
          <MenuItem name="LOADED TOTS" price="9" />
          <MenuItem name="SWEET POTATO WAFFLE FRIES" price="10" />
          <MenuItem name="BIG NOODLE MAC N CHEESE" price="12" />
          <MenuItem name="SLAW" price="6" />
          <MenuItem name="MASHED POTATOES" price="7" />
          <MenuItem name="VEGETABLE MEDLEY" price="8" />
          <MenuItem name="POTATO SALAD" price="9" />
          <MenuItem name="GARLIC SAUTÉED ASPARAGUS" price="8" />
          <MenuItem name="GARLIC GREEN BEANS" price="7" />
        </div>
      </div>

      {/* Happy Hour */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">HAPPY HOUR</h2>
        <p className="text-lg font-sans mb-4">3-6 PM Monday - Friday</p>

        <h3 className="font-serif text-xl md:text-2xl mt-6 mb-4">DRINKS ($2 OFF)</h3>
        <p className="text-base text-charcoal/80 mb-2">Draft beers</p>
        <p className="text-base text-charcoal/80 mb-2">Rail drinks</p>
        <p className="text-base text-charcoal/80 mb-2">Il Vince Pinot Grigio</p>
        <p className="text-base text-charcoal/80">Vino Red Blend</p>

        <h3 className="font-serif text-xl md:text-2xl mt-6 mb-4">SMALL BITES</h3>
        <div className="space-y-3">
          <MenuItem name="MINI NACHOS" price="4" description="pork, chicken, chili or black bean" />
          <MenuItem name="WINGS (min 6 per style)" price=".85" description="BBQ, buffalo, cajun or old Bay" />
          <MenuItem name="TWO FRIED GREEN TOMATO SLIDERS" price="6" description="bacon, FGT, remoulade, spinach" />
          <MenuItem name="CHEESE FRIES" price="6" description="gravy on the side" />
        </div>
      </div>

      {/* Weekly Specials */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">WEEKLY SPECIALS</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-sans font-semibold text-lg md:text-xl text-charcoal mb-2">MONDAY</h3>
            <p className="text-base text-charcoal/80">$10 Burger (dine-in only)</p>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg md:text-xl text-charcoal mb-2">TUESDAY</h3>
            <p className="text-base text-charcoal/80">Southern Fried Chicken and Pork BBQ Ribs</p>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg md:text-xl text-charcoal mb-2">WEDNESDAY</h3>
            <p className="text-base text-charcoal/80 font-semibold mb-1">RAW BAR</p>
            <p className="text-base text-charcoal/80">Shrimp, Clams, Mussels, Oysters</p>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg md:text-xl text-charcoal mb-2">TACO THURSDAY</h3>
            <p className="text-base text-charcoal/80">Time to Fiesta</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Desserts Menu Component
function DessertsMenu() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">Desserts Menu</h1>
      </div>

      <div className="space-y-8">
        <MenuItem
          name="DOUBLE FUDGE BROWNIE"
          price="11"
          description="house made brownie, vanilla ice cream, hot fudge"
        />
        <MenuItem name="COCONUT CREAM PIE" price="10" />
        <MenuItem name="NORTHSIDE KEYLIME PIE" price="10" />
        <MenuItem
          name="BEIGNETS"
          price="12"
          description="5 beignets, chocolate, butterscotch, and berry dipping sauces"
        />
        <MenuItem
          name="PARLOR SUNDAE"
          price="12"
          description="vanilla icecream, hot fudge, salted peanuts, whipped cream, caramel drizzle"
        />
        <MenuItem name="CINNAMON RAISIN BREAD PUDDING" price="12" />
        <MenuItem name="PEANUT BUTTER CHOCOLATE CHEESECAKE" price="14" />
        <MenuItem name="ICE CREAM" price="6" />
      </div>
    </div>
  )
}

// Kids Menu Component
function KidsMenu() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">Kids Menu</h1>
      </div>

      <div className="space-y-8">
        <MenuItem name="CHICKEN TENDERS" price="9" description="hand breaded tenders served with a side" />
        <MenuItem
          name="PENNE PASTA"
          price="8"
          description="penne pasta tossed in a light butter and parmesan, add fried chicken —2"
        />
        <MenuItem name="GRILLED CHICKEN" price="10" description="marinated grilled chicken with one side" />
        <MenuItem
          name="BURGER with FRIES"
          price="9"
          description="juicy kids size burger serve with fries, Add cheese — 1"
        />
        <MenuItem
          name="GRILLED CHEESE"
          price="8"
          description="grilled cheese serve with fries, add bacon—1, tomato—1, avocado—2"
        />
        <MenuItem name="HOT DOG with FRIES" price="8" />
        <MenuItem name="STEAK AND FRIES" price="12" description="beef tenderloin with fries and apples" />
        <MenuItem name="FLOUNDER BITES" price="10" description="fried flounder served with one side" />
      </div>
    </div>
  )
}

// Daily Specials Menu Component
function SpecialsMenu() {
  // Get current day of week (0 = Sunday, 3 = Wednesday, 4 = Thursday)
  const dayOfWeek = new Date().getDay()
  
  // Wednesday = 3, Thursday = 4
  const isWednesday = dayOfWeek === 3
  const isThursday = dayOfWeek === 4
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">Daily Specials</h1>
        <p className="font-sans text-sm md:text-base text-charcoal/70 mt-4">
          Check back daily for our latest specials, updated by our chef
        </p>
      </div>

      {/* Wednesday: Raw Bar Specials */}
      {isWednesday && (
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 pb-2 border-b-2 border-brick-red text-center">
            Raw Bar Specials
          </h2>
          <DailySpecialsDisplay type="rawbar" />
        </div>
      )}

      {/* Thursday: Taco Thursday */}
      {isThursday && (
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 pb-2 border-b-2 border-brick-red text-center">
            Taco Thursday
          </h2>
          <DailySpecialsDisplay type="tacothursday" />
        </div>
      )}

      {/* Other Days: Lunch & Dinner Specials */}
      {!isWednesday && !isThursday && (
        <>
          {/* Dynamic Lunch Special */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 pb-2 border-b-2 border-brick-red text-center">
              Today's Lunch Special
            </h2>
            <DailySpecialsDisplay type="lunch" />
          </div>

          {/* Dynamic Dinner Special */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 pb-2 border-b-2 border-brick-red text-center">
              Tonight's Dinner Special
            </h2>
            <DailySpecialsDisplay type="dinner" />
          </div>
        </>
      )}
    </div>
  )
}

// Menu Item Component
interface MenuItemProps {
  name: string
  price: string
  description?: string
}

function MenuItem({ name, price, description }: MenuItemProps) {
  return (
    <div className="group">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h3 className="font-sans font-semibold text-base md:text-lg text-charcoal uppercase tracking-wide flex-1">
          {name}
        </h3>
        <span className="font-sans font-bold text-base md:text-lg text-charcoal whitespace-nowrap">{price}</span>
      </div>
      {description && <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">{description}</p>}
    </div>
  )
}
