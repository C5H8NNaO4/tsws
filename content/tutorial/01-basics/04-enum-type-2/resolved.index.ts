enum ContractStatus {
  Permanent = 1,
  Temp,
  Apprentice,
}

const employeeStatus: ContractStatus = ContractStatus.Temp;
console.log({ employeeStatus });

console.log({ employeeStatusVal: ContractStatus[employeeStatus] });
