number = int(input());

for i in range(number):
    for j in range(number):
        if(j % 2 == 0):
            print(i + 1, end="");
        else:
            print(number - i, end="");
    print();